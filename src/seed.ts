import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const CATEGORIES = [
  { name: 'Coffee', sortOrder: 1, image: null },
  { name: 'Tea', sortOrder: 2, image: null },
  { name: 'Pastries', sortOrder: 3, image: null },
  { name: 'Breakfast', sortOrder: 4, image: 'breakfast.webp' },
  { name: 'Sweet Treats', sortOrder: 5, image: null },
  { name: 'Starters', sortOrder: 6, image: 'breakfast2.webp' },
  { name: 'Sandwiches', sortOrder: 7, image: 'breakfast3.webp' },
  { name: 'Burgers', sortOrder: 8, image: null },
  { name: 'Salads', sortOrder: 9, image: 'pilau-closeup.webp' },
  { name: 'Pasta', sortOrder: 10, image: null },
  { name: 'Charcoal Over Pizza', sortOrder: 11, image: 'pizza.webp' },
  { name: 'Clay Oven', sortOrder: 12, image: 'pilau-side.webp' },
  { name: 'Main Dishes', sortOrder: 13, image: 'pilau.webp' },
]

type SeedItem = { name: string; price: number; description?: string; sortOrder: number }

const ITEMS: Record<string, SeedItem[]> = {
  Coffee: [
    { name: 'Espresso', price: 250, sortOrder: 1 },
    { name: 'Americano', price: 300, sortOrder: 2 },
    { name: 'Cappuccino', price: 350, sortOrder: 3 },
    { name: 'Caffe Latte', price: 350, sortOrder: 4 },
    { name: 'Latte Macchiato', price: 350, sortOrder: 5 },
    { name: 'Mocha', price: 400, sortOrder: 6 },
    { name: 'Hot Chocolate', price: 400, sortOrder: 7 },
    { name: 'Flavoured Latte', price: 450, sortOrder: 8 },
  ],
  Tea: [
    { name: 'Kenyan Tea', price: 250, sortOrder: 1 },
    { name: 'Brewed Somali Tea', price: 250, sortOrder: 2 },
    { name: 'Flavoured Kenyan Tea', price: 250, sortOrder: 3 },
    { name: 'Masala Tea', price: 300, sortOrder: 4 },
    { name: 'Dawa Tea', price: 300, sortOrder: 5 },
  ],
  Pastries: [
    { name: 'Cinnamon Roll', price: 200, sortOrder: 1 },
    { name: 'Butter Croissant', price: 220, sortOrder: 2 },
    { name: 'Chocolate Croissant', price: 250, sortOrder: 3 },
    { name: 'Almond Croissant', price: 280, sortOrder: 4 },
  ],
  Breakfast: [
    { name: 'Tropical Fruit Salad', price: 650, description: 'A vibrant mix of seasonal tropical fruits, refreshing and healthy topped with option of yoghurt or nuts.', sortOrder: 1 },
    { name: 'Breakfast Wrap', price: 720, description: 'A hearty flat bread wrap filled with a plain omelette, vegetables, and chicken.', sortOrder: 2 },
    { name: 'Mediterranean Scramble', price: 750, description: 'Creamy scrambled eggs paired with fresh Mediterranean ingredients like spinach, feta, and olives.', sortOrder: 3 },
    { name: 'Granola Bowl', price: 780, description: 'Crunchy granola layered with creamy yogurt and juicy fresh fruits topped with a drizzle of Kenyan honey.', sortOrder: 4 },
    { name: 'Shakshouka', price: 850, description: 'A Middle Eastern favorite with poached eggs in a savory tomato sauce, bell peppers, and spice medley.', sortOrder: 5 },
    { name: 'Eggs Benedict', price: 900, description: 'A classic featuring poached eggs and ham or smoked salmon atop an English muffin, crowned with rich hollandaise.', sortOrder: 6 },
    { name: 'English Breakfast', price: 950, description: 'A warm cast iron plate of eggs, sausages, beef bacon, baked beans, grilled tomatoes, and toasted bread or naan.', sortOrder: 7 },
    { name: 'Mushroom on Toast', price: 950, description: 'Toasted multicereal bread topped with sautéed creamy mushrooms, garnished with fresh herbs.', sortOrder: 8 },
  ],
  'Sweet Treats': [
    { name: 'NBO Pancakes', price: 650, description: 'Fluffy and light pancakes served with your choice of syrups, fruits, or other delicious toppings.', sortOrder: 1 },
    { name: 'Crepe', price: 650, description: 'Thin pancakes served with assorted fruits and whipping cream, maple or honey.', sortOrder: 2 },
    { name: 'French Toast', price: 850, description: 'Thick slices of bread dipped in egg batter, pan-fried until golden, and served with sweet toppings.', sortOrder: 3 },
  ],
  Starters: [
    { name: 'French Fries', price: 350, description: 'Classic potato sticks fried to perfection, crisp and salty.', sortOrder: 1 },
    { name: 'Bhajia', price: 400, description: 'Golden-fried slices of vegetables coated in a spiced gram flour batter.', sortOrder: 2 },
    { name: 'Soup of the Day', price: 450, description: 'Daily fresh-made soup crafted from seasonal ingredients.', sortOrder: 3 },
    { name: 'Samosa', price: 450, description: 'Three pieces of crispy pastry pockets filled with spiced meat or vegetables.', sortOrder: 4 },
    { name: 'Sticky Wings', price: 950, description: 'Juicy sweet and spicy 12 pieces of chicken wings drizzled with sesame seeds.', sortOrder: 5 },
  ],
  Sandwiches: [
    { name: 'Caesar Roll-Up', price: 950, description: 'A soft tortilla wrap packed with Caesar-dressed chicken, lettuce and crisp vegetables.', sortOrder: 1 },
    { name: 'Chicken Tikka Sandwich', price: 980, description: 'Juicy, spiced charcoal-roasted chicken tikka in a flatbread, lettuce, tomatoes and mixed peppers paired with a raita sauce.', sortOrder: 2 },
    { name: 'NBO Club Sandwich', price: 1050, description: 'A stacked sandwich with layers of chicken, beef bacon, lettuce, tomato, onions, boiled egg and mayo.', sortOrder: 3 },
    { name: 'Steak Sandwich', price: 1150, description: 'Tender beef steak slices layered with onions, lettuce, tomatoes and Thousand Island sauce in flatbread.', sortOrder: 4 },
  ],
  Burgers: [
    { name: 'Veg Burger', price: 650, description: 'A wholesome vegetarian patty made with fresh veggies, beans, or grains.', sortOrder: 1 },
    { name: 'Classic Chicken Burger', price: 850, description: 'A succulent breaded or grilled chicken patty with lettuce and mayo.', sortOrder: 2 },
    { name: 'Beef Burger', price: 950, description: 'A classic grilled beef patty loaded with fresh toppings and condiments.', sortOrder: 3 },
    { name: 'Curried Chicken Burger', price: 1050, description: 'An exciting burger with a curried chicken patty for a bold flavor.', sortOrder: 4 },
  ],
  Salads: [
    { name: 'Greek Salad', price: 850, description: 'A vibrant mix of tomatoes, cucumbers, olives, onions, and feta cheese.', sortOrder: 1 },
    { name: 'Garden Salad', price: 850, description: 'A light mix of fresh greens, tomatoes, cucumbers, and vinaigrette.', sortOrder: 2 },
    { name: 'Caesar Salad', price: 950, description: 'A timeless combination of crunchy iceberg lettuce, Caesar dressing, parmesan, and croutons.', sortOrder: 3 },
    { name: 'Nicoise Salad', price: 1050, description: 'A wholesome salad with tuna, hard-boiled eggs, and a medley of fresh veggies.', sortOrder: 4 },
  ],
  Pasta: [
    { name: 'Penne Arrabiata', price: 830, description: 'Penne pasta in a tangy tomato and chili sauce with parmesan cheese and a spicy kick.', sortOrder: 1 },
    { name: 'Spaghetti Bolognese', price: 850, description: 'Pasta served with a rich Bolognese sauce with tomato.', sortOrder: 2 },
    { name: 'Penne Alfredo Mushroom', price: 950, description: 'Creamy Alfredo sauce with sautéed mushrooms or chicken and penne pasta.', sortOrder: 3 },
    { name: 'Carbonara', price: 1050, description: 'A creamy linguine pasta dish with egg, cheese, and crispy bacon.', sortOrder: 4 },
  ],
  'Charcoal Over Pizza': [
    { name: 'Margarita', price: 1150, description: 'A simple yet delicious pizza with pomodoro sauce, mozzarella, and basil.', sortOrder: 1 },
    { name: 'Duo Cheese', price: 1250, description: 'A cheesy combination of mozzarella and feta cheese on pomodoro sauce, oregano, and rocket leaves.', sortOrder: 2 },
    { name: 'Hawaiian', price: 1250, description: 'Sweet and savory pizza with beef bacon, pomodoro, mozzarella cheese and pineapple toppings.', sortOrder: 3 },
    { name: 'Chicken Tikka', price: 1350, description: 'Pizza topped with smoky, spiced chicken tikka, mozzarella cheese and pomodoro sauce.', sortOrder: 4 },
    { name: 'Peri-Peri', price: 1350, description: 'A fiery pizza with peri-peri spiced chicken with coriander and sweet peppers toppings.', sortOrder: 5 },
    { name: 'Tuna', price: 1350, description: 'A fresh and flavorful pizza featuring tuna chunks, mozzarella, pomodoro sauce, black olives and onions.', sortOrder: 6 },
    { name: 'Meat Lovers', price: 1400, description: 'Packed with chicken, beef and beef bacon for the ultimate carnivore delight. Mozzarella cheese and pomodoro sauce.', sortOrder: 7 },
  ],
  'Clay Oven': [
    { name: 'Mugh e Tandoor', price: 1250, description: 'Succulent tandoori-roasted chicken marinated in bold spices.', sortOrder: 1 },
    { name: 'Mugh Tikka Shole', price: 1300, description: 'Spiced chunks of chicken thighs in tikka marinades grilled in a traditional tandoor.', sortOrder: 2 },
    { name: 'Tandoori Lamb Chops', price: 1500, description: 'Lightly marinated lamb chops roasted in a traditional tandoori.', sortOrder: 3 },
    { name: 'Tarah Tarah Platter', price: 1800, description: 'A mixed platter showcasing an array of tandoori specialties. Chicken tikka, roasted chicken, lamb kebab and tikka wings.', sortOrder: 4 },
  ],
  'Main Dishes': [
    { name: 'Grilled Chicken Breast', price: 1050, description: 'Juicy and flavorful chicken breast, marinated and grilled to perfection. Served with veggies or salad and an accompaniment of choice.', sortOrder: 1 },
    { name: 'Swahili Biryani', price: 1050, description: 'Fragrant, spiced rice with tender chicken in Swahili style. Served with raita.', sortOrder: 2 },
    { name: 'Beef Mandi', price: 1050, description: 'Slow-cooked beef served with aromatic rice, seasoned to perfection.', sortOrder: 3 },
    { name: 'Chicken Curry', price: 1100, description: 'Chicken cooked in a rich and flavorful yellow creamy curry sauce. Served with rice.', sortOrder: 4 },
    { name: 'Thai Fish Fillet', price: 1250, description: 'A delicate fish fillet cooked in coconut cream infused with Thai flavors and spices. Served with steamed vegetables and rice.', sortOrder: 5 },
    { name: 'Grilled Beef Fillet', price: 1350, description: 'Tender marinated beef fillet grilled to your liking. Served with veggies, mushroom sauce and accompaniment of choice.', sortOrder: 6 },
    { name: 'Lamb Leg', price: 1500, description: 'A charcoal-roasted lamb leg. Marinated in fragrant spices and served with roasted vegetables and rice.', sortOrder: 7 },
  ],
}

async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err: any) {
      if (i < retries - 1 && (err?.code === 112 || err?.codeName === 'WriteConflict')) {
        console.log(`  ⟳ Transient error, retrying in 2s... (${i + 1}/${retries})`)
        await new Promise((r) => setTimeout(r, 2000))
      } else {
        throw err
      }
    }
  }
  throw new Error('Exhausted retries')
}

async function seed() {
  const payload = await getPayload({ config })

  // Small delay to let MongoDB finish creating collections
  await new Promise((r) => setTimeout(r, 2000))

  console.log('👤 Creating admin user...')
  await withRetry(() =>
    payload.delete({
      collection: 'users',
      where: { email: { equals: 'kulmidigital@gmail.com' } },
    }),
  )
  await withRetry(() =>
    payload.create({
      collection: 'users',
      data: {
        email: 'kulmidigital@gmail.com',
        password: 'kulmidigital@gmail.com',
        roles: ['admin'],
      },
    }),
  )
  console.log('  ✓ Kulmi Digital (admin)')

  console.log('\n🧹 Clearing existing menu data...')
  await withRetry(() =>
    payload.delete({ collection: 'menu-items', where: { id: { exists: true } } }),
  )
  await withRetry(() =>
    payload.delete({ collection: 'menu-categories', where: { id: { exists: true } } }),
  )

  console.log('📂 Creating categories...')
  const categoryMap: Record<string, string> = {}

  for (const cat of CATEGORIES) {
    const created = await payload.create({
      collection: 'menu-categories',
      data: {
        name: cat.name,
        sortOrder: cat.sortOrder,
        image: cat.image ?? undefined,
      },
    })
    categoryMap[cat.name] = created.id
    console.log(`  ✓ ${cat.name}`)
  }

  console.log('🍽️  Creating menu items...')
  let totalItems = 0

  for (const [categoryName, items] of Object.entries(ITEMS)) {
    const categoryId = categoryMap[categoryName]
    if (!categoryId) {
      console.error(`  ✗ Category "${categoryName}" not found!`)
      continue
    }

    for (const item of items) {
      await payload.create({
        collection: 'menu-items',
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          category: categoryId,
          sortOrder: item.sortOrder,
          available: true,
          isPromo: false,
        },
      })
      totalItems++
    }
    console.log(`  ✓ ${categoryName}: ${items.length} items`)
  }

  console.log(`\n✅ Seeded ${CATEGORIES.length} categories and ${totalItems} menu items.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
