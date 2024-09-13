import numpy as np
import cv2
import pytesseract
from PIL import Image, ImageEnhance
import json

# Example usage
image_path = "./public/assets/schedule.jpeg"
file_path = "./public/assets/schedule.json"


def preprocess_image(image_path):
    # Read the image
    img = cv2.imread(image_path)

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian blur to remove noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Apply adaptive thresholding
    thresh = cv2.adaptiveThreshold(
        blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

    # Apply dilation and erosion to remove small noise
    kernel = np.ones((1, 1), np.uint8)
    processed_img = cv2.dilate(thresh, kernel, iterations=1)
    processed_img = cv2.erode(processed_img, kernel, iterations=1)

    # Save the processed image
    processed_image_path = 'processed_image.png'
    cv2.imwrite(processed_image_path, processed_img)

    return processed_img


def parse_table_from_image(image_path):
    # Preprocess the image
    img = preprocess_image(image_path)

    # Use pytesseract to do OCR on the image with custom configuration
    custom_config = r'--oem 3 --psm 12'
    ocr_text = pytesseract.image_to_string(img, config=custom_config)

    # Process the OCR text and convert it into JSON data
    # This is a placeholder implementation
    print(f"ocr_text: {ocr_text}")

    json_data = {
        "table": [line.split() for line in ocr_text.split('\n') if line.strip()]
    }

    return json_data


def save_json_data(file_path, json_data):
    with open(file_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=2)


# Parse the table from the image and save it as JSON
json_data = parse_table_from_image(image_path)
save_json_data(file_path, json_data)
print(f"Data saved to {file_path}")
