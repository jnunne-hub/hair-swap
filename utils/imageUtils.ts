export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const stripBase64Prefix = (base64String: string): string => {
  return base64String.split(',')[1];
};

export const getMimeTypeFromDataUrl = (dataUrl: string): string => {
    const matches = dataUrl.match(/^data:(.*?);base64,/);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    // Fallback for safety, though it shouldn't be needed with valid data URLs.
    return 'image/jpeg';
};