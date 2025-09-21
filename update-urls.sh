#!/bin/bash

# Update all React components to use API_BASE_URL from config

# Files to update
files=(
  "src/GetNifPage.jsx"
  "src/CasePage.jsx"
  "src/ClientCasesTab.jsx"
  "src/CollaboratorProfilePage.jsx"
  "src/ChatTab.jsx"
)

echo "Updating API URLs to use configuration..."

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Add import if not exists
    if ! grep -q "API_BASE_URL" "$file"; then
      # Find the import section and add our import
      if grep -q "import.*sharedStyles" "$file"; then
        sed -i '/import.*sharedStyles/a import { API_BASE_URL } from "./config";' "$file"
      else
        # Add after other imports
        sed -i '1i import { API_BASE_URL } from "./config";' "$file"
      fi
    fi
    
    # Replace localhost URLs
    sed -i 's|http://localhost:8000|${API_BASE_URL}|g' "$file"
    sed -i 's|`http://localhost:8000/|`${API_BASE_URL}/|g' "$file"
    sed -i 's|"http://localhost:8000/|`${API_BASE_URL}/|g' "$file"
    
  else
    echo "File $file not found"
  fi
done

echo "Done updating API URLs"