export const openWhatsAppOrder = ({ name, phone, address, items, total }) => {
  const adminNumber = "919876543210"; // ✅ your WhatsApp number

  const itemsText = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} | Qty: ${item.qty} | Price: ₹${item.price}`
    )
    .join("\n");

  const message = `✅ YOUR ORDER IS CONFIRMED - ELARA ✅

👤 Name: ${name}
📞 Phone: ${phone}
🏠 Address: ${address}

🛍 Items:
${itemsText}

💰 Total Amount: ₹${total}

Thank you for shopping with ELARA ❤️`;

  window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, "_blank");
};
