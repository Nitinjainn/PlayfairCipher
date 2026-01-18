# Playfair Cipher - Encryption & Decryption Tool

**ISS Assignment • 2026**

This is an academic assignment for **Information System Security (ISS)** course, implementing the Playfair Cipher algorithm - a symmetric-key substitution cipher that encrypts pairs of letters using a 5×5 matrix.

## Overview

The Playfair Cipher is a digraphic substitution cipher that encrypts pairs of letters (digraphs) instead of single letters. It was invented by Charles Wheatstone in 1854 and named after Lord Playfair who promoted its use.

## Algorithm Logic

### 1. Matrix Generation

The cipher uses a 5×5 matrix filled with a 25-letter alphabet (I and J are treated as the same letter):

- **Key Processing**: The secret key is processed to remove duplicates and non-alphabetic characters
- **J → I Conversion**: All 'J' characters are replaced with 'I' (standard Playfair convention)
- **Matrix Construction**: The matrix is filled by:
  1. Adding unique letters from the key (in order)
  2. Filling remaining positions with unused letters from the alphabet (A-Z, excluding J)
  3. Result: A 5×5 grid containing all 25 letters exactly once

### 2. Text Preprocessing

Before encryption/decryption, the plaintext is processed:

- **Uppercase Conversion**: All text is converted to uppercase
- **J → I Conversion**: All 'J' characters are replaced with 'I'
- **Non-alphabetic Removal**: All spaces, numbers, and special characters are removed
- **Digraph Formation**: Text is split into pairs of letters:
  - If two identical letters appear together, insert 'X' between them
  - If the text has an odd length, append 'X' at the end

### 3. Encryption Rules

For each digraph (pair of letters), find their positions in the matrix and apply one of three rules:

#### Rule 1: Same Row
If both letters are in the same row:
- Shift each letter **right by 1 position** (wrapping around to the left if needed)
- Example: If letters are at positions (0,1) and (0,3), they become (0,2) and (0,4)

#### Rule 2: Same Column
If both letters are in the same column:
- Shift each letter **down by 1 position** (wrapping around to the top if needed)
- Example: If letters are at positions (1,2) and (3,2), they become (2,2) and (4,2)

#### Rule 3: Different Row and Column
If letters are in different rows and columns:
- **Swap the columns**: Take the row of the first letter with the column of the second letter, and vice versa
- Example: If letters are at (1,2) and (3,4), they become (1,4) and (3,2)

### 4. Decryption Rules

Decryption follows the same three rules but with **reverse shifts**:

- **Same Row**: Shift **left by 1** (equivalent to right shift by 4 in modulo 5)
- **Same Column**: Shift **up by 1** (equivalent to down shift by 4 in modulo 5)
- **Different Row/Column**: Same as encryption (swapping columns is its own inverse)

## Implementation Details

### Matrix Generation
```javascript
// Key processing: Remove duplicates, convert J to I, keep only A-Z
let key = secretKey.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
let fullKey = [...new Set(key + alphabet)].slice(0, 25);
```

### Encryption/Decryption Shift
```javascript
const shift = isEncrypt ? 1 : 4;  // Right/Down for encrypt, Left/Up for decrypt
```

The decryption shift of 4 is equivalent to shifting left/up by 1 in a 5×5 grid (since 4 ≡ -1 mod 5).

## Features

- ✅ **Real-time Matrix Visualization**: See the 5×5 cipher matrix update as you type the key
- ✅ **Live Encryption/Decryption**: Instant results as you type
- ✅ **Digraph Preview**: View how your text is split into letter pairs
- ✅ **Copy to Clipboard**: One-click copy of encrypted/decrypted results
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Terminal-style UI**: Modern, clean interface with terminal aesthetics

## Usage

1. **Enter Secret Key**: Type your encryption key in the "SECRET CIPHER KEY" field
   - The matrix will automatically update to show the 5×5 grid
   - Only letters A-Z are used (J is treated as I)

2. **Encrypt Text**:
   - Enter your plaintext in the "PLAINTEXT INPUT" field
   - The encrypted result appears instantly in "ENCRYPTED RESULT"
   - Click the copy button to copy the ciphertext

3. **Decrypt Text**:
   - Enter ciphertext in the "CIPHERTEXT INPUT" field
   - The decrypted result appears instantly in "DECRYPTED RESULT"
   - Click the copy button to copy the plaintext

## Technical Stack

- **HTML5**: Structure and semantic markup
- **CSS3**: Responsive styling with modern design
- **Vanilla JavaScript**: Pure JS implementation (no dependencies)
- **JetBrains Mono**: Monospace font for code/terminal aesthetics

## Security Notes

⚠️ **Educational Purpose Only**: This implementation is for academic learning purposes as part of the ISS course assignment. The Playfair Cipher is **not secure** for modern cryptographic applications and should not be used for real-world security.

## Author

**Nitin Jain**  
ISS Assignment • 2026

---

*This project demonstrates understanding of classical cryptography algorithms and their implementation in web technologies.*
