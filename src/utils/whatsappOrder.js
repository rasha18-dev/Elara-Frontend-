export const openWhatsAppOrder = ({ name, phone, address, items, total }) => {
  const adminNumber = "917736952028"; // ✅ your WhatsApp number

  const itemsText = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} | Qty: ${item.qty} | Price: ₹${item.price}`
    )
    .join("\n");

  const message = `✅ YOUR ORDER IS CONFIRMED -  RUMEA ✅

👤 Name: ${name}
📞 Phone: ${phone}
🏠 Address: ${address}

🛍 Items:
${itemsText}

💰 Total Amount: ₹${total}

Thank you for shopping with RUMEA ❤️`;

  window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, "_blank");
};
