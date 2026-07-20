/**
 * Exact image URLs from the Readdy reference:
 * https://readdy.cc/preview/1abd6199-d67b-445e-9517-f3a7a92db2a6/12147738/
 * Queries, seq IDs, sizes, and orientation match the live reference 1:1.
 */
const R = (
  query: string,
  width: number,
  height: number,
  seq: string,
  orientation: 'portrait' | 'squarish' = 'portrait',
) =>
  `https://readdy.ai/api/search-image?query=${encodeURIComponent(query)}&width=${width}&height=${height}&seq=${seq}&orientation=${orientation}`

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
      'Designer saree blouse in deep maroon with gold zari work,  displayed on bust form with soft neutral background, luxury fashion photography',
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
      'Indian bride in traditional red and gold saree with heavy jewelry, elegant wedding portrait photography, warm golden lighting, soft cream background',
      600,
      800,
      'occ-wedding-01',
    ),
    festivals: R(
      'Indian woman in a vibrant festive work saree with rich gold embroidery and traditional jewelry, Diwali celebration mood, marigold flowers, warm golden lighting, elegant ethnic fashion portrait, soft cream background',
      600,
      800,
      'occ-festival-02',
    ),
    daily: R(
      'Young woman in simple elegant cotton kurta set in pastel blush pink, minimalist daily wear ethnic fashion, soft natural lighting, clean background',
      600,
      800,
      'occ-daily-01',
    ),
    party: R(
      'Glamorous Indian woman in a designer party wear saree in deep burgundy with sequin and shimmer work, evening ethnic fashion, dramatic soft lighting, luxury editorial photography',
      600,
      800,
      'occ-party-02',
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
      'Adorable kids ethnic lehenga choli set in soft pink and gold, on mannequin against warm cream background, children fashion photography',
      400,
      500,
      'prod-vaani-01',
    ),
    vibhaKids: R(
      'Beautiful kids anarkali dress in peach and ivory with floral embroidery, mannequin display, soft lighting, premium children ethnic wear',
      400,
      500,
      'prod-vibha-kids-01',
    ),
    babyFrock: R(
      'Delicate baby girl silk frock in pastel pink with gold accents, flat lay on cream background, luxury kids ethnic wear product shot',
      400,
      500,
      'prod-baby-01',
    ),
    babyGown: R(
      'Elegant baby girl ethnic gown in soft lavender with ruffle details, flat lay display on neutral background, premium children fashion photography',
      400,
      500,
      'prod-baby-gown-01',
    ),
    sairaCotton: R(
      'Comfortable cotton kurta set in soft mint green with minimal print, on mannequin against neutral background, daily wear ethnic fashion photography',
      400,
      500,
      'kurta-saira-01',
    ),
    sairaSilk: R(
      'Silk blend kurta in warm peach with subtle embroidery details, on mannequin with soft lighting, premium daily ethnic wear photography',
      400,
      500,
      'kurta-saira-silk-01',
    ),
    sairaPrinted: R(
      'Floral printed kurta set in blush pink and ivory, elegant daily wear design, on mannequin against soft cream background, fashion photography',
      400,
      500,
      'kurta-print-01',
    ),
    aadhira1: R(
      'Raw silk salwar kameez set in deep wine with gold zari accents, traditional design, on mannequin against warm background, luxury ethnic fashion photography',
      400,
      500,
      'kurta-aadhira-01',
    ),
    aadhira2: R(
      'Elegant raw silk three piece suit in emerald green with gold embroidery, traditional Indian design, on mannequin, premium fashion photography',
      400,
      500,
      'kurta-aadhira-02',
    ),
    aadhira3: R(
      'Traditional raw silk salwar suit in royal blue with intricate mirror work, on mannequin against soft neutral background, luxury ethnic wear photography',
      400,
      500,
      'kurta-aadhira-03',
    ),
    vaishnava: R(
      'Traditional Indian skirt and top set in ivory with colorful embroidery, on mannequin against soft cream background, premium ethnic fashion photography',
      400,
      500,
      'dress-vaishnava-01',
    ),
    sohviCrop: R(
      'Elegant crop top and long skirt set in blush pink with lace work, on mannequin, soft neutral background, contemporary ethnic wear photography',
      400,
      500,
      'dress-sohvi-01',
    ),
    sohviDress: R(
      'Stunning ethnic gown dress in deep wine with gold embroidery and flowing silhouette, on mannequin against warm background, luxury fashion photography',
      400,
      500,
      'dress-sohvi-ethnic-01',
    ),
    parvathamalli1: R(
      'Traditional half saree lehenga style in vibrant pink and gold, on mannequin against soft neutral background, South Indian ethnic fashion photography',
      400,
      500,
      'halfsaree-01',
    ),
    parvathamalli2: R(
      'Elegant half saree in pastel peach with temple border design, traditional drape on mannequin, warm lighting, premium ethnic wear photography',
      400,
      500,
      'halfsaree-02',
    ),
    brhinda: R(
      'Graceful pure chiffon half saree in soft lavender with silver accents, flowing fabric on mannequin, soft background, luxury fashion photography',
      400,
      500,
      'halfsaree-03',
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
      'Simple elegant daily wear cotton blouse in blush pink with minimal embroidery, on bust form, clean neutral background, premium product shot',
      500,
      600,
      'blouse-daily-01',
    ),
    maggam: R(
      'Elaborate maggam work blouse in deep maroon with heavy gold thread embroidery, on bust form against soft background, luxury bridal fashion photography',
      500,
      600,
      'blouse-maggam-01',
    ),
    traditional: R(
      'Traditional silk blouse in rich burgundy with classic elbow sleeves and gold border, on bust form, warm lighting, ethnic fashion photography',
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
      'Mother and daughter wearing matching floral kurtas in blush pink, outdoor garden setting, warm natural lighting, ethnic twinning fashion photography',
      600,
      700,
      'combo-02',
    ),
    festive: R(
      'Mother and daughter in coordinated festive outfits in burgundy and gold, elegant indoor setting with warm lighting, traditional family portrait photography',
      600,
      700,
      'combo-03',
    ),
  },
  collections: {
    aaditri: R(
      'Luxurious bridal saree in rich red and gold with heavy embroidery, dramatic lighting, premium wedding collection editorial photography, warm tones',
      700,
      900,
      'coll-aaditri-01',
    ),
    nirvi: R(
      'Vibrant festive saree in deep orange and maroon with traditional motifs, elegant display, warm golden lighting, premium festival collection photography',
      700,
      900,
      'coll-nirvi-01',
    ),
    gulabi: R(
      'Soft cotton saree in blush pink with delicate floral print, relaxed elegant display, natural lighting, daily wear collection photography',
      700,
      900,
      'coll-gulabi-01',
    ),
    shriya: R(
      'Glamorous designer saree in midnight blue with silver sequin work, dramatic evening lighting, luxury party wear collection editorial photography',
      700,
      900,
      'coll-shriya-01',
    ),
  },
  testimonial: R(
    'Elegant Indian woman in traditional saree posing gracefully in warm indoor setting with soft natural lighting, ethnic fashion editorial photography, blush pink and burgundy tones',
    700,
    900,
    'testimonial-main-01',
  ),
  avatar: R(
    'Professional headshot of young Indian woman with warm smile, soft natural lighting, neutral background, elegant portrait photography',
    100,
    100,
    'avatar-priya-01',
    'squarish',
  ),
  instagram: [
    R(
      'Elegant Indian woman in burgundy saree with gold jewelry, lifestyle fashion photography, warm indoor setting, Instagram style square crop',
      400,
      400,
      'insta-01',
      'squarish',
    ),
    R(
      'Beautiful ethnic wear flat lay with saree, jewelry, and flowers in blush pink and gold, aesthetic Instagram style photography',
      400,
      400,
      'insta-02',
      'squarish',
    ),
    R(
      'Young woman in designer kurta set walking in traditional courtyard, natural lighting, lifestyle ethnic fashion, Instagram style photography',
      400,
      400,
      'insta-03',
      'squarish',
    ),
    R(
      'Close up of intricate embroidery work on silk blouse in maroon and gold, detail shot, warm lighting, Instagram style macro photography',
      400,
      400,
      'insta-04',
      'squarish',
    ),
    R(
      'Mother and daughter in matching ethnic outfits, warm family moment, soft natural lighting, Instagram lifestyle photography',
      400,
      400,
      'insta-05',
      'squarish',
    ),
    R(
      'Elegant Indian bride getting ready in traditional saree with floral decorations, candid moment, warm tones, Instagram style photography',
      400,
      400,
      'insta-06',
      'squarish',
    ),
  ],
} as const
