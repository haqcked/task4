const formatDate = (timestamp, includeTime = false) => {
  const date = new Date(timestamp);
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  if (includeTime) {
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.hour12 = true;
  }
  return date.toLocaleString('en-US', options);
};

export default formatDate
