export default function calcItemQuantity(cart) {
    let totalItems = 0;
    for (const album of cart) {
      totalItems += album.quantity;
    }
    return totalItems;
  }