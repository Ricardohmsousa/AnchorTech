import re

# Read the file
file_path = r"C:\Users\RicSou\OneDrive - Körber AG\Desktop\TechAnchor\frontend\src\components\layout\HomePage.jsx"

with open(file_path, 'r', encoding='utf-8') as file:
    content = file.read()

# Find the section to replace
# Look for the pattern from RelocationJourney /> to Immigration Checklist CTA
pattern = r'(<RelocationJourney />)(.*?)(\{/\* Immigration Checklist CTA \*/\})'

# Replace with just the RelocationJourney and Immigration Checklist CTA
replacement = r'\1\n\n      \3'

# Perform the replacement
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back to file
with open(file_path, 'w', encoding='utf-8') as file:
    file.write(new_content)

print("File cleaned successfully!")