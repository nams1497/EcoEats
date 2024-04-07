import cv2
import pytesseract
import re
from datetime import datetime

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return None
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blur, 128, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return thresh

def extract_expiry_date(image):
    custom_config = r'--oem 3 --psm 6'
    text = pytesseract.image_to_string(image, config=custom_config)
    date_pattern = r'(\d{2}[./-]\d{2}[./-]\d{2,4})'
    matches = re.findall(date_pattern, text)
    # Extract the date, ensuring it matches the expected format (e.g., day first, month second)
    if matches:
        # Optional: Validate the extracted date here (e.g., check if it is a plausible date)
        return matches[0]  # Assuming the first match is the expiry date
    return "No expiry date found"

def format_expiry_date(date_str):
    # Split the date into parts assuming the format is DD.MM.YY
    day, month, year = date_str.split('.')
    
    # the year is in 2000s
    year = f"20{year}"
    
    # Create a date object using datetime library
    date_obj = datetime.strptime(f"{day}/{month}/{year}", "%d/%m/%Y")
    
    # Format the date as dd/mm/yyyy
    formatted_date = date_obj.strftime('%d/%m/%Y')
    return formatted_date

def expiry(image_path):
    processed_image = preprocess_image(image_path)
    expiry_date = extract_expiry_date(processed_image)
    formatted_expiry_date = format_expiry_date(expiry_date)
    return formatted_expiry_date
