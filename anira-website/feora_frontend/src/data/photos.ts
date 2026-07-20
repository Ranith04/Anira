/** Exact imagery from the Readdy reference via their image CDN. */
export const R = (query: string, width: number, height: number, seq: string) =>
  `https://readdy.ai/api/search-image?query=${encodeURIComponent(query)}&width=${width}&height=${height}&seq=${seq}&orientation=portrait`

export const PHOTOS = {
  heroSaree: R(
    'Elegant Indian woman wearing a luxurious deep burgundy work saree with intricate gold zari embroidery and heavy mirror work, rich silk fabric with elaborate pallu design, traditional jewelry, soft warm studio lighting, blush pink and champagne gold backdrop, high-end ethnic fashion photography, full body shot',
    800,
    900,
    'hero-saree-01',
  ),
  heroKurta: R(
    'Elegant Indian woman wearing a designer ivory and wine embroidered kurta with delicate thread work and sequin accents, paired with matching dupatta, flowing silhouette, soft warm studio lighting, cream and blush pink backdrop, high-end ethnic fashion photography, full body shot',
    800,
    900,
    'hero-kurta-01',
  ),
  categories: {
    sarees: R(
      'Elegant Indian silk saree in deep burgundy and gold displayed on mannequin with soft neutral studio background, premium editorial fashion photography, warm lighting',
      600,
      800,
      'cat-sarees-01',
    ),
    kurtas: R(
      'Premium designer kurta set in blush pink and ivory with intricate embroidery, on mannequin against soft cream background, luxury ethnic wear photography',
      600,
      800,
      'cat-kurtas-01',
    ),
    blouses: R(
      'Designer saree blouse in deep maroon with gold zari work, displayed on bust form with soft neutral background, luxury fashion photography',
      600,
      800,
      'cat-blouses-01',
    ),
    dresses: R(
      'Elegant ethnic midi dress in wine and blush pink with hand embroidery, on mannequin against soft warm background, premium editorial photography',
      600,
      800,
      'cat-dresses-01',
    ),
  },
  occasions: {
    wedding: R(
      'Bridal Indian woman in rich red and gold lehenga with heavy embroidery, wedding editorial photography, soft warm lighting',
      600,
      800,
      'occ-wedding-01',
    ),
    festivals: R(
      'Woman in vibrant festive silk saree with gold jewelry, Diwali celebration mood, warm golden lighting, ethnic fashion photography',
      600,
      800,
      'occ-festivals-01',
    ),
    daily: R(
      'Woman in comfortable cotton kurta set for daily wear, soft natural lighting, lifestyle ethnic fashion photography',
      600,
      800,
      'occ-daily-01',
    ),
    party: R(
      'Woman in elegant party wear ethnic gown with sequin work, evening lighting, glamorous fashion photography',
      600,
      800,
      'occ-party-01',
    ),
  },
  products: {
    priya: R(
      'Luxury Banarasi silk saree in deep red with gold zari borders, neatly folded display on cream background, premium product photography',
      400,
      500,
      'prod-priya-01',
    ),
    vibha: R(
      'Traditional Kanjeevaram silk saree in temple border design with rich gold work, folded on soft neutral background, luxury product shot',
      400,
      500,
      'prod-vibha-01',
    ),
    shriya: R(
      'Elegant chiffon saree in soft blush pink with pearl embroidery details, folded display on ivory background, premium fashion photography',
      400,
      500,
      'prod-shriya-01',
    ),
    aakriti: R(
      'Raw tussar silk saree in earth tone with natural texture and minimal border, folded on cream background, organic luxury product photography',
      400,
      500,
      'prod-aakriti-01',
    ),
    vaani: R(
      'Kids lehenga set in pink and gold for little girl, festive kids ethnic wear, soft studio lighting, product photography',
      400,
      500,
      'prod-vaani-01',
    ),
    vibhaKids: R(
      'Kids anarkali dress in soft pastel with embroidery, little girl ethnic wear, cream background product photography',
      400,
      500,
      'prod-vibha-kids-01',
    ),
    babyFrock: R(
      'Baby girl silk frock in traditional design with gold accents, kids ethnic wear product photography',
      400,
      500,
      'prod-baby-frock-01',
    ),
    babyGown: R(
      'Baby girl ethnic gown in soft pink with embroidery, kids festive wear product photography',
      400,
      500,
      'prod-baby-gown-01',
    ),
    sairaCotton: R(
      'Cotton kurta set in soft pastel with simple embroidery, daily wear ethnic fashion product photography',
      400,
      500,
      'prod-saira-cotton-01',
    ),
    sairaSilk: R(
      'Silk blend kurta in elegant design with subtle embroidery, premium daily wear product photography',
      400,
      500,
      'prod-saira-silk-01',
    ),
    sairaPrinted: R(
      'Printed cotton kurta set with floral motifs, comfortable daily ethnic wear product photography',
      400,
      500,
      'prod-saira-printed-01',
    ),
    aadhira1: R(
      'Raw silk salwar kameez set in deep wine with gold zari accents, traditional design, on mannequin against warm background, luxury ethnic fashion photography',
      400,
      500,
      'kurta-aadhira-01',
    ),
    aadhira2: R(
      'Raw silk 3-piece suit in ivory and gold, traditional ethnic wear on mannequin, luxury product photography',
      400,
      500,
      'kurta-aadhira-02',
    ),
    aadhira3: R(
      'Raw silk salwar suit in blush pink with traditional embroidery, ethnic fashion product photography',
      400,
      500,
      'kurta-aadhira-03',
    ),
    vaishnava: R(
      'Traditional skirt set in vibrant colors with embroidery, ethnic dress product photography',
      400,
      500,
      'prod-vaishnava-01',
    ),
    sohviCrop: R(
      'Hakoba crop top and skirt set in ivory, ethnic fashion product photography',
      400,
      500,
      'prod-sohvi-crop-01',
    ),
    sohviDress: R(
      'Ethnic dress in soft tones with delicate embroidery, product photography on cream background',
      400,
      500,
      'prod-sohvi-dress-01',
    ),
    parvathamalli1: R(
      'Traditional half saree lehenga style in vibrant pink and gold, on mannequin against soft neutral background, South Indian ethnic fashion photography',
      400,
      500,
      'prod-parva-01',
    ),
    parvathamalli2: R(
      'Half saree in rich maroon and gold with traditional border, ethnic fashion product photography',
      400,
      500,
      'prod-parva-02',
    ),
    brhinda: R(
      'Pure chiffon half saree in soft pastel with delicate work, premium ethnic product photography',
      400,
      500,
      'prod-brhinda-01',
    ),
  },
  blouses: {
    hakoba: R(
      'Designer hakoba lace blouse in ivory white with intricate cutwork embroidery, on bust form against soft neutral background, luxury fashion photography',
      500,
      600,
      'blouse-hakoba-01',
    ),
    daily: R(
      'Simple daily wear blouse in soft cotton, elegant design, fashion product photography',
      500,
      600,
      'blouse-daily-01',
    ),
    maggam: R(
      'Maggam work blouse with heavy gold embroidery, luxury blouse product photography',
      500,
      600,
      'blouse-maggam-01',
    ),
    traditional: R(
      'Traditional silk blouse in deep maroon with gold border, ethnic fashion photography',
      500,
      600,
      'blouse-trad-01',
    ),
  },
  combos: {
    motherDaughter: R(
      'Mother and daughter in matching pink saree and lehenga, warm family portrait, traditional Indian ethnic wear, soft natural lighting, elegant composition',
      600,
      700,
      'combo-01',
    ),
    twinning: R(
      'Mother and daughter in matching kurta sets, twinning ethnic wear, warm family portrait photography',
      600,
      700,
      'combo-02',
    ),
    festive: R(
      'Family in festive ethnic wear matching outfits, celebration mood, warm photography',
      600,
      700,
      'combo-03',
    ),
  },
  collections: {
    aaditri: R(
      'Luxurious bridal saree in rich red and gold with heavy embroidery, dramatic lighting, premium wedding collection editorial photography',
      500,
      650,
      'coll-aaditri-01',
    ),
    nirvi: R(
      'Festive collection saree in vibrant colors with gold work, editorial ethnic fashion photography',
      500,
      650,
      'coll-nirvi-01',
    ),
    gulabi: R(
      'Daily wear collection kurta in soft blush pink, lifestyle ethnic fashion photography',
      500,
      650,
      'coll-gulabi-01',
    ),
    shriya: R(
      'Party wear collection ethnic gown with sequins, glamorous fashion photography',
      500,
      650,
      'coll-shriya-01',
    ),
  },
  testimonial: R(
    'Elegant Indian woman in traditional saree posing gracefully in warm indoor setting with soft natural lighting, ethnic fashion editorial photography, blush pink and burgundy tones',
    700,
    900,
    'testimonial-main-01',
  ),
  instagram: [
    R('Indian woman in burgundy saree Instagram style photo', 400, 400, 'ig-01'),
    R('Woman in designer kurta casual ethnic Instagram photo', 400, 400, 'ig-02'),
    R('Bridal lehenga detail Instagram fashion photo', 400, 400, 'ig-03'),
    R('Festive saree drape Instagram style shot', 400, 400, 'ig-04'),
    R('Kids ethnic wear Instagram photo', 400, 400, 'ig-05'),
    R('Mother daughter twinning ethnic Instagram photo', 400, 400, 'ig-06'),
  ],
} as const
