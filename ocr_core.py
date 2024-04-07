try:
    from PIL import Image
    import re 
    import ast
    import json
except ImportError:
    import Image
import pytesseract

def extract_section_from_abn_to_subtotal_modified(text):
    pattern = re.compile(r'(ABN.*?)(?=\d+ SUBTOTAL)', re.DOTALL)
    match = pattern.search(text)
    if not match:
        return "Unable to find the item listings in the provided text using the given regex."
    items_section = match.group(1).strip()
    return items_section

# 2. Extracting Items with Prices
def extract_items_with_prices(text):
    pattern = re.compile(r'(.*?)([\d\.]+)\s*$', re.MULTILINE)
    items = pattern.findall(text)
    extracted_items = []
    for item, price in items:
        cleaned_item = re.sub(r'[^a-zA-Z0-9\s]', '', item).strip()
        extracted_items.append(f"{cleaned_item} {price}")
    return extracted_items

# 3. Extracting and Formatting Items
def extract_and_format_items(text):
    lines = text.split('\n')
    formatted_items = []
    for i, line in enumerate(lines):
        if 'ABN' in line:
            continue
        if 'Oty' in line and 'each' in line:
            qty, subtotal = re.search(r'Oty (\d+)@.*each ([\d.]+)', line).groups()
            item_name = re.sub(r'[^a-zA-Z0-9\s/]', '', lines[i - 1]).strip()
            formatted_items.append(f"Name: {item_name}\nPrice: ${subtotal}\nQty: {qty}\n")
        elif re.search(r'[\d.]+\s*$', line) and 'Oty' not in lines[i + 1 if i + 1 < len(lines) else i]:
            item, price = re.search(r'(.*?)([\d.]+)\s*$', line).groups()
            item_name = re.sub(r'[^a-zA-Z0-9\s/]', '', item).strip()
            formatted_items.append(f"Name: {item_name}\nPrice: ${price}\nQty: 1\n")
    return formatted_items

# 4. Convert Formatted Items to JSON with Nested Structure
def save_items_as_json(formatted_items, file_name):
    items_dict = {}
    for item in formatted_items:
        lines = item.split('\n')
        item_name = lines[0].replace("Name: ", "").strip()
        item_dict = {
            "Amount": lines[2].replace("Qty: ", "").strip(),
            "Spent": "$" + lines[1].replace("Price: $", "").strip()
        }
        items_dict[item_name] = item_dict
    with open(file_name, 'w') as f:
        json.dump(items_dict, f, indent=4)
    return items_dict

def ocr_core(filename):
    """
    This function will handle the core OCR processing of images.
    """
    text1 = pytesseract.image_to_string(Image.open(filename)) # We'll use Pillow's Image class to open the image and pytesseract to detect the string in the image
    extracted_section_modified = extract_section_from_abn_to_subtotal_modified(text1)
    formatted_item_details = extract_and_format_items(extracted_section_modified)
    items_dict = save_items_as_json(formatted_item_details, 'items.json')
    json_string = json.dumps(items_dict, indent=4)
    extracted_text = re.sub('\n','',json_string)
    n =ast.literal_eval(extracted_text)
    result_list = []
    for name, info in n.items():
        amount = int(info["Amount"])
        spent = float(info["Spent"].replace('$', ''))
        result_list.append({"name": name, "amount": amount, "spent": spent})
    
    return result_list

#print(ocr_core('images/ocr_example_1.png'))