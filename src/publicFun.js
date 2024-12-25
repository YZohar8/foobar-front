function compressBase64Image(base64Image, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64Image;

        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            const compressedBase64 = canvas.toDataURL('image/jpeg', quality); 

            resolve(compressedBase64);
        };

        img.onerror = (err) => {
            reject(err);
        };
    });
}

// Function to calculate how much time has passed since the post was created
function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000); // Calculate the difference in seconds
  const minutes = Math.floor(seconds / 60); // Convert to minutes
  const hours = Math.floor(minutes / 60); // Convert to hours
  const days = Math.floor(hours / 24); // Convert to days
  const months = Math.floor(days / 28); // Convert to months
  const year = Math.floor(months / 12); // Convert to years

  // Return the appropriate time format based on the elapsed time
  if (year > 0) return `${year} years ago`;
  if (months > 0) return `${months} months ago`;
  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  return `${Math.floor(seconds)} seconds ago`;
}
const publicFun = {
    compressBase64Image,
    timeSince,
};

export default publicFun;
