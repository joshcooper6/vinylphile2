export default function calculateTotalCost(albums) {
    let totalCost = 0;
    for (const album of albums) {
      totalCost += album.price * album.quantity;
    }
    return Math.round(totalCost * 100) / 100;
  }