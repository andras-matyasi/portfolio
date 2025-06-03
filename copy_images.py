#!/usr/bin/env python3
import os
import shutil
import unicodedata

def remove_accents(input_str):
    """Remove accents from Unicode characters."""
    nfd = unicodedata.normalize('NFD', input_str)
    without_accents = u"".join([c for c in nfd if unicodedata.category(c) != 'Mn'])
    return without_accents

def create_ascii_filename(name):
    """Convert name to ASCII-safe filename."""
    # Remove accents
    ascii_name = remove_accents(name)
    # Replace spaces with underscores and convert to lowercase
    ascii_name = ascii_name.replace(' ', '_').replace('-', '_').lower()
    return ascii_name

def copy_images():
    source_dir = "client/public/images/references"
    
    # Mapping of original names to target ASCII filenames
    name_mapping = {
        "András_Barasits.jpeg": "andras_barasits.jpg",
        "Donát_Bali-papp.jpeg": "donat_bali_papp.jpg"
    }
    
    for original, target in name_mapping.items():
        source_path = os.path.join(source_dir, original)
        target_path = os.path.join(source_dir, target)
        
        if os.path.exists(source_path):
            shutil.copy2(source_path, target_path)
            print(f"Copied {original} -> {target}")
        else:
            print(f"Source file not found: {original}")

if __name__ == "__main__":
    copy_images()