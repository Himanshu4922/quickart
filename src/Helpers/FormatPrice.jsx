const FormatPrice = ({ price }) => {
    return Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price * 25);
  };
  
  export default FormatPrice;