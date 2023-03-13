const functions = require("firebase-functions");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SEC);
const express = require("express");
const app = express();
const port = 1111;

app.use(express.json());
app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));

const DOMAIN = `http://localhost:5173/`;

async function getProducts() {
  try {
    return await stripe.products.list({ limit: 100 });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get products");
  }
}

async function getPrice(priceId) {
  try {
    return await stripe.prices.retrieve(priceId);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get price");
  }
}

app.get("/vinyls", async (REQUEST, REZ) => {
  try {
    const response = await getProducts();
    const active = response.data.filter((x) => x.active == true);

    const tgt = active.map((album) => {
      return {
        id: album.id,
        name: album.name,
        priceId: album.default_price,
        image: album.images[0],
        metadata: album.metadata,
      };
    });

    const ultimateResult = await Promise.all(
      tgt.map(async (album) => {
        if (album.priceId != null) {
          let newPrice = await getPrice(album.priceId);
          return {
            ...album,
            convertedPrice: newPrice.unit_amount,
            currency: newPrice.currency,
          };
        }
        return { ...album };
      })
    );

    REZ.send(ultimateResult);
    console.log(ultimateResult);
  } catch (error) {
    console.error(error);
    REZ.sendStatus(500);
  }
});

app.post("/checkout", async (req, res) => {
  const cart = req.body.cart;

  if (req.body.cart.length <= 0) {
    console.log('You aint got enough items in your cart to checkout, sis.');
    return null;
  }

  console.log(
    cart.map((item) => {
      return { price: item.priceId, quantity: item.quantity };
    })
  );

  const session = await stripe.checkout.sessions.create({
    line_items: cart.map((item) => {
      return { price: item.priceId, quantity: item.quantity };
    }),
    mode: "payment",
    success_url: `${DOMAIN}?success=true`,
    cancel_url: `${DOMAIN}?canceled=true`,
    allow_promotion_codes: true,
    // automatic_tax: {enabled: true},
  });

  res.send(session.url);
});

app.listen(port, () => {
  console.log(`server deployed on port ${port}`);
});


exports.app = functions.https.onRequest(app);
