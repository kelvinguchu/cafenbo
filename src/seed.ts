import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

type SeedPriceVariant = {
  label: string
  price: number
}

type SeedCategory = {
  name: string
  sortOrder: number
  image: string | null
}

type SeedItem = {
  name: string
  price: number
  description?: string
  priceVariants?: SeedPriceVariant[]
  sortOrder: number
}

const CATEGORIES = [
  { name: 'Coffee', sortOrder: 1, image: 'coffee.webp' },
  { name: 'Tea', sortOrder: 2, image: 'tea.webp' },
  { name: 'Soft Drinks', sortOrder: 3, image: 'drink.webp' },
  { name: 'Cold Drinks', sortOrder: 4, image: 'drink.webp' },
  { name: 'Bakery', sortOrder: 5, image: 'cake.webp' },
  { name: 'All Day Breakfast', sortOrder: 6, image: 'pancakes-and-coffee.webp' },
  { name: 'Starters', sortOrder: 7, image: 'starters.webp' },
  { name: 'Sandwiches', sortOrder: 8, image: 'sandwiches.webp' },
  { name: 'Burgers', sortOrder: 9, image: 'burgers.webp' },
  { name: 'Salads', sortOrder: 10, image: 'salad.webp' },
  { name: 'Pasta', sortOrder: 11, image: 'pasta.webp' },
  { name: 'Charcoal Oven Pizza', sortOrder: 12, image: 'pizza.webp' },
  { name: 'Clay Oven & Indian Cuisine', sortOrder: 13, image: 'clay-pot-rice.webp' },
  { name: 'Extras', sortOrder: 14, image: 'lunch.webp' },
  { name: 'NBO Main Dishes', sortOrder: 15, image: 'rice-chicken-tray.webp' },
] satisfies SeedCategory[]

const ITEMS: Record<string, SeedItem[]> = {
  Coffee: [
    {
      name: 'Espresso',
      price: 200,
      priceVariants: [
        { label: 'Single', price: 200 },
        { label: 'Double', price: 250 },
      ],
      sortOrder: 1,
    },
    {
      name: 'Americano',
      price: 250,
      priceVariants: [
        { label: 'Single', price: 250 },
        { label: 'Double', price: 300 },
      ],
      sortOrder: 2,
    },
    {
      name: 'Cappuccino',
      price: 290,
      priceVariants: [
        { label: 'Single', price: 290 },
        { label: 'Double', price: 350 },
      ],
      sortOrder: 3,
    },
    {
      name: 'Caffe Latte',
      price: 290,
      priceVariants: [
        { label: 'Single', price: 290 },
        { label: 'Double', price: 350 },
      ],
      sortOrder: 4,
    },
    {
      name: 'Latte Macchiato',
      price: 290,
      priceVariants: [
        { label: 'Single', price: 290 },
        { label: 'Double', price: 350 },
      ],
      sortOrder: 5,
    },
    { name: 'Caffe Mocha', price: 400, sortOrder: 6 },
    { name: 'Flavoured Latte', price: 450, sortOrder: 7 },
    { name: 'Spanish Latte', price: 500, sortOrder: 8 },
  ],
  Tea: [
    { name: 'Karak Tea', price: 300, sortOrder: 1 },
    { name: 'Adrak Tea', price: 300, sortOrder: 2 },
    { name: 'Brewed Kenyan Tea', price: 250, sortOrder: 3 },
    { name: 'Brewed Somali Tea', price: 250, sortOrder: 4 },
    { name: 'Masala Tea', price: 250, sortOrder: 5 },
    { name: 'Camel Tea', price: 300, sortOrder: 6 },
    { name: 'Saffron Tea', price: 350, sortOrder: 7 },
    { name: 'Hot Chocolate', price: 350, sortOrder: 8 },
    { name: 'Moroccan Mint', price: 300, sortOrder: 9 },
    { name: 'Green Tea', price: 250, sortOrder: 10 },
    { name: 'Chamomile Tea', price: 250, sortOrder: 11 },
    { name: 'Earl Grey Tea', price: 250, sortOrder: 12 },
    { name: 'Hibiscus Tea', price: 250, sortOrder: 13 },
    { name: 'Dawa Tea', price: 300, sortOrder: 14 },
    { name: 'Cinnamon / Orange Dawa', price: 300, sortOrder: 15 },
    { name: 'Hot Matcha Tea', price: 500, sortOrder: 16 },
  ],
  'Soft Drinks': [
    {
      name: 'Coke / Fanta / Sprite / Bitter Lemon / Coke Zero / Stoney',
      price: 200,
      sortOrder: 1,
    },
    { name: 'Still Water (500ml)', price: 200, sortOrder: 2 },
    { name: 'Still Water (1 Litre)', price: 250, sortOrder: 3 },
    { name: 'Sparkling Water (500ml)', price: 250, sortOrder: 4 },
    { name: 'Sparkling Water (1 Litre)', price: 300, sortOrder: 5 },
    {
      name: 'Freshly Squeezed Juice',
      price: 500,
      description: 'Choose from mango, passion, pineapple, or orange.',
      sortOrder: 6,
    },
  ],
  'Cold Drinks': [
    {
      name: 'Classic Shake',
      price: 500,
      description: 'Choose vanilla, strawberry, or chocolate.',
      sortOrder: 1,
    },
    { name: 'Oreo Shake', price: 550, sortOrder: 2 },
    { name: 'Coffee Shake', price: 550, sortOrder: 3 },
    { name: 'Caramel Shake', price: 550, sortOrder: 4 },
    { name: 'Blueberry Smoothie', price: 550, sortOrder: 5 },
    { name: 'Strawberry Smoothie', price: 550, sortOrder: 6 },
    { name: 'Mango Smoothie', price: 550, sortOrder: 7 },
    { name: 'Banana Smoothie', price: 550, sortOrder: 8 },
    { name: 'Classic Mojito / Lemonade', price: 350, sortOrder: 9 },
    { name: 'Blue Lemonade', price: 400, sortOrder: 10 },
    { name: 'Passion Mojito', price: 400, sortOrder: 11 },
    { name: 'Strawberry Mojito', price: 400, sortOrder: 12 },
    { name: 'Pineapple Mojito', price: 400, sortOrder: 13 },
    { name: 'Pina Colada', price: 450, sortOrder: 14 },
    { name: 'Sunrise', price: 400, sortOrder: 15 },
    { name: 'Mango Ginger Fizz', price: 450, sortOrder: 16 },
    { name: 'Passion Paradise', price: 400, sortOrder: 17 },
    { name: 'Iced Flavoured Matcha Tea', price: 650, sortOrder: 18 },
  ],
  Bakery: [
    { name: 'Tiramisu Cake', price: 400, sortOrder: 1 },
    { name: 'White / Black Forest Cake', price: 450, sortOrder: 2 },
    { name: 'Red Velvet Cake', price: 450, sortOrder: 3 },
    { name: 'Mexican Brownie', price: 450, sortOrder: 4 },
    { name: 'Cake Slice of the Day', price: 400, sortOrder: 5 },
    { name: 'Assorted Muffins', price: 200, sortOrder: 6 },
    {
      name: 'Cookies',
      price: 50,
      description: 'Different flavours available.',
      sortOrder: 7,
    },
  ],
  'All Day Breakfast': [
    {
      name: 'Your Choice of Omelette',
      price: 650,
      description: '3 egg omelette served with home fries, toast, butter and jam.',
      sortOrder: 1,
    },
    {
      name: 'Morning Booster',
      price: 500,
      description: '2 eggs, french fries and sausage.',
      sortOrder: 2,
    },
    {
      name: 'English Breakfast',
      price: 1050,
      description:
        'A plate of eggs, sausages, beef bacon, baked beans, grilled tomatoes and toasted bread.',
      sortOrder: 3,
    },
    {
      name: 'Mixed Fruit Salad',
      price: 650,
      description:
        'A vibrant mix of seasonal tropical fruits, refreshing and healthy, topped with yogurt or nuts.',
      sortOrder: 4,
    },
    {
      name: 'Spanish Breakfast',
      price: 750,
      description:
        'A Middle Eastern favorite with poached eggs in a savory tomato sauce, bell peppers and a spice medley.',
      sortOrder: 5,
    },
    {
      name: 'Granola Bowl',
      price: 750,
      description:
        'Crunchy granola layered with creamy yogurt and juicy fresh fruits topped with a drizzle of Kenyan honey.',
      sortOrder: 6,
    },
    {
      name: 'NBO Pancakes',
      price: 900,
      description:
        'Fluffy and light pancakes served with syrups, fruits, or other delicious toppings.',
      sortOrder: 7,
    },
    {
      name: 'Malawa',
      price: 500,
      description: 'Thin Somali-style pancakes served with honey.',
      sortOrder: 8,
    },
    {
      name: 'French Toast',
      price: 990,
      description:
        'Thick slices of bread dipped in egg butter, pan-fried until golden brown and served with sweet toppings.',
      sortOrder: 9,
    },
    { name: 'Kheema Chapati (Beef or Chicken)', price: 650, sortOrder: 10 },
  ],
  Starters: [
    {
      name: 'French Fries',
      price: 300,
      description: 'Classic potato sticks fried to perfection, crispy and salty.',
      sortOrder: 1,
    },
    {
      name: 'Bhajia',
      price: 400,
      description: 'Golden-fried slices of potatoes coated in a spiced gram flour batter.',
      sortOrder: 2,
    },
    {
      name: 'Soup of the Day',
      price: 400,
      description: 'Daily fresh-made soup crafted from seasonal ingredients.',
      sortOrder: 3,
    },
    {
      name: 'Sticky / Dry Wings',
      price: 650,
      description:
        'Juicy sweet or dry and spicy chicken wings, served as 6 pieces and drizzled with sesame.',
      sortOrder: 4,
    },
    { name: 'Masala Chips', price: 350, sortOrder: 5 },
    { name: 'Lemon and Garlic Chips', price: 350, sortOrder: 6 },
    { name: 'Paprika Fries', price: 350, sortOrder: 7 },
    { name: 'Peri-peri Fries', price: 350, sortOrder: 8 },
    { name: 'Vegetable Spring Rolls', price: 350, sortOrder: 9 },
    { name: 'Meat Samosa (Chicken or Beef)', price: 450, sortOrder: 10 },
  ],
  Sandwiches: [
    {
      name: 'Smoked Chicken Sandwich',
      price: 950,
      description:
        'A smoked chicken breast with a combination of vegetables, served with chips or salad, cocktail sauce and coleslaw.',
      sortOrder: 1,
    },
    {
      name: 'Chicken Wrap',
      price: 950,
      description:
        'A soft tortilla wrap packed with Caesar-dressed chicken, lettuce and kachumbari, served with chips or salad, cocktail sauce and coleslaw.',
      sortOrder: 2,
    },
    {
      name: 'Chicken Tikka Sandwich',
      price: 980,
      description:
        'Juicy spiced charcoal-roasted chicken tikka in flatbread with lettuce, tomatoes and mixed peppers, paired with raita sauce and served with chips or salad, cocktail sauce and coleslaw.',
      sortOrder: 3,
    },
    {
      name: 'NBO Club Sandwich',
      price: 1050,
      description:
        'A stacked sandwich with chicken, beef bacon, lettuce, tomatoes, onions, fried egg and mayo, served with chips or salad, cocktail sauce and coleslaw.',
      sortOrder: 4,
    },
    {
      name: 'Steak Sandwich',
      price: 1150,
      description:
        'Tender beef steak slices layered with onions, lettuce, tomatoes and Thousand Island sauce in flatbread, served with chips or salad, cocktail sauce and coleslaw.',
      sortOrder: 5,
    },
  ],
  Burgers: [
    {
      name: 'Veg Burger',
      price: 700,
      description: 'A wholesome vegetarian patty made with fresh veggies, beans or grains.',
      sortOrder: 1,
    },
    {
      name: 'Classic Chicken Burger',
      price: 990,
      description: 'A succulent breaded or grilled chicken patty with lettuce and mayo.',
      sortOrder: 2,
    },
    {
      name: 'Beef Burger',
      price: 990,
      description: 'A classic beef patty loaded with fresh toppings and condiments.',
      sortOrder: 3,
    },
    {
      name: 'Double Trouble Burger',
      price: 1250,
      description: 'Two classic beef patties loaded with mushroom and guacamole.',
      sortOrder: 4,
    },
    {
      name: 'Texas Burger',
      price: 1050,
      description: 'Classic beef patty loaded with cheese, eggs and beef bacon.',
      sortOrder: 5,
    },
    {
      name: 'Burger King',
      price: 1350,
      description: 'Two classic patties loaded with cheese, beef bacon, guacamole and eggs.',
      sortOrder: 6,
    },
  ],
  Salads: [
    {
      name: 'Garden Salad',
      price: 750,
      description: 'A light mix of fresh greens, tomatoes, cucumber and vinaigrette.',
      sortOrder: 1,
    },
    {
      name: 'Caesar Salad Vegetarian',
      price: 850,
      description:
        'A timeless combination of crunchy iceberg lettuce, Caesar dressing, Parmesan and croutons.',
      sortOrder: 2,
    },
    {
      name: 'Caesar Salad Chicken',
      price: 1100,
      description:
        'A timeless combination of crunchy iceberg lettuce, Caesar dressing, Parmesan and croutons with chicken.',
      sortOrder: 3,
    },
    {
      name: 'Mexican Salad',
      price: 1050,
      description:
        'A combination of lettuce, cheddar cheese, avocado, sweetcorn, roasted cauliflower, chicken and black beans.',
      sortOrder: 4,
    },
    {
      name: 'Cobb Salad',
      price: 1250,
      description:
        'A combination of lettuce, tomatoes, beef bacon, chicken, avocado, cheese and boiled eggs.',
      sortOrder: 5,
    },
  ],
  Pasta: [
    {
      name: 'Spaghetti Bolognese',
      price: 990,
      description: 'Pasta served with a rich ragu sauce and Parmesan cheese.',
      sortOrder: 1,
    },
    {
      name: 'Pasta Alfredo Mushroom',
      price: 1300,
      description:
        'Creamy Alfredo sauce with sauteed mushrooms, chicken and pasta of your choice, finished with Parmesan cheese.',
      sortOrder: 2,
    },
    {
      name: 'Pasta Saldado',
      price: 1200,
      description: 'Linguine pasta cooked in red sauce, served with chicken or fish fillet.',
      sortOrder: 3,
    },
    {
      name: 'Curried Pasta',
      price: 1200,
      description: 'Linguine pasta cooked in curry sauce, served with chicken or fish fillet.',
      sortOrder: 4,
    },
  ],
  'Charcoal Oven Pizza': [
    {
      name: 'Margarita',
      price: 1050,
      description: 'A simple yet delicious pizza with pomodoro sauce, mozzarella and basil.',
      sortOrder: 1,
    },
    {
      name: 'Hawaiian',
      price: 1400,
      description:
        'Sweet and savory pizza with beef bacon, chicken, mushrooms, pomodoro, pineapple toppings and mozzarella cheese.',
      sortOrder: 2,
    },
    {
      name: 'Chicken Tikka',
      price: 1250,
      description:
        'Pizza topped with fresh chillies, onions, sweet peppers, spiced chicken tikka, pomodoro sauce and mozzarella cheese.',
      sortOrder: 3,
    },
    {
      name: 'Chicken BBQ',
      price: 1200,
      description:
        'A delicious pizza with barbecue sauce, chicken breast in BBQ sauce and mozzarella cheese.',
      sortOrder: 4,
    },
    {
      name: 'Half and Half',
      price: 1300,
      description:
        'A combination of chicken and beef pizza with pomodoro sauce and mozzarella cheese.',
      sortOrder: 5,
    },
  ],
  'Clay Oven & Indian Cuisine': [
    {
      name: 'Murgh-e-Tandoor',
      price: 950,
      priceVariants: [
        { label: '1/4', price: 950 },
        { label: '1/2', price: 1250 },
      ],
      description: 'Succulent tandoori-roasted chicken marinated in bold spices.',
      sortOrder: 1,
    },
    {
      name: 'Tarah Tarah Platter',
      price: 3400,
      description:
        'A mixed platter showcasing an array of tandoori specialties: chicken tikka, roasted beef, lamb kebab and tikka wings.',
      sortOrder: 2,
    },
    { name: 'Butter Chicken', price: 1200, sortOrder: 3 },
    {
      name: 'Swahili Biryani (Chicken / Mutton / Beef)',
      price: 1300,
      description:
        'Fragrant, spiced rice with tender meat of your choice in Swahili style. Served with raita and kachumbari.',
      sortOrder: 4,
    },
    { name: 'Pilau (Beef / Mutton / Chicken)', price: 1300, sortOrder: 5 },
    { name: 'Grilled Mshikaki (Beef / Chicken / Mutton)', price: 990, sortOrder: 6 },
    { name: 'Sheesh Kebab - Chicken', price: 990, sortOrder: 7 },
    {
      name: 'Beef / Chicken Curry',
      price: 1200,
      description:
        'Cooked in a rich and flavorful yellow creamy curry sauce. Served with accompaniment of your choice.',
      sortOrder: 8,
    },
  ],
  Extras: [
    { name: 'Chapati', price: 150, sortOrder: 1 },
    { name: 'Mandazi', price: 100, sortOrder: 2 },
    { name: 'Vegetable Rice', price: 300, sortOrder: 3 },
    { name: 'Buttered Naan Bread', price: 150, sortOrder: 4 },
    { name: 'Creamed Spinach', price: 150, sortOrder: 5 },
    { name: 'Ugali', price: 100, sortOrder: 6 },
    { name: 'Kachumbari', price: 100, sortOrder: 7 },
    { name: 'Sausage (Beef / Chicken)', price: 200, sortOrder: 8 },
    { name: 'Egg', price: 150, sortOrder: 9 },
    { name: 'Avocado', price: 100, sortOrder: 10 },
    { name: 'Plantain', price: 200, sortOrder: 11 },
    { name: 'Banana', price: 50, sortOrder: 12 },
    { name: 'Plain White Rice', price: 200, sortOrder: 13 },
  ],
  'NBO Main Dishes': [
    {
      name: 'Grilled Chicken Breast',
      price: 1200,
      description:
        'Juicy and flavorful chicken breast marinated and grilled to perfection. Served with accompaniment of your choice.',
      sortOrder: 1,
    },
    {
      name: 'Thai Fish Fillet',
      price: 1400,
      description:
        'A delicate fish fillet simmered in coconut cream sauce infused with Thai flavors and spices.',
      sortOrder: 2,
    },
    {
      name: 'Grilled Beef Fillet',
      price: 1550,
      description:
        'Tender marinated beef fillet grilled to your liking. Served with veggies, mushroom sauce and accompaniment of your choice.',
      sortOrder: 3,
    },
    {
      name: 'Lamb / Goat Leg',
      price: 1690,
      description:
        'Slow-cooked lamb or goat leg marinated in fragrant spices and served with sauteed vegetables and rice.',
      sortOrder: 4,
    },
    { name: 'Fish Curry', price: 1350, sortOrder: 5 },
    {
      name: 'Chicken Schnitzel',
      price: 1200,
      description: 'Flavorful chicken breast dusted in eggs and bread crumbs.',
      sortOrder: 6,
    },
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

  // Admin user creation is disabled so the menu seed can be rerun without
  // trying to create the first admin account a second time.
  // console.log('👤 Creating admin user...')
  // await withRetry(() =>
  //   payload.delete({
  //     collection: 'users',
  //     where: { email: { equals: 'kulmidigital@gmail.com' } },
  //   }),
  // )
  // await withRetry(() =>
  //   payload.create({
  //     collection: 'users',
  //     data: {
  //       email: 'kulmidigital@gmail.com',
  //       password: 'kulmidigital@gmail.com',
  //       roles: ['admin'],
  //     },
  //   }),
  // )
  // console.log('  ✓ Kulmi Digital (admin)')

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
          priceVariants: item.priceVariants,
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
