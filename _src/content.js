/*
  FACTS SHEET: every business detail on the site comes from here.
  Source: beautymedicalclinic.com (WordPress pages read 1 Nov 2026).
  Not published on the old site, so NOT on this one: hours, prices, parking, years in business as a clinic.
*/
const FACTS = {
  name: 'Beauty Medical Clinic',
  tagline: 'where art meets science',
  owner: 'Rebecca Victoria Adam',
  ownerTitle: 'Registered Nurse and Certified Advanced Cosmetic Injector',
  phone: '416-728-5697',
  phoneIntl: '+1-416-728-5697',
  tel: 'tel:+14167285697',
  sms: 'sms:+14167285697',
  whatsapp: 'https://wa.me/14167285697',
  email: 'info@beautymedicalclinic.com',
  building: 'Medical Arts building',
  street: '7131 Bathurst St., Unit 103',
  city: 'Thornhill',
  region: 'ON',
  postal: 'L4J 7Z1',
  intersection: 'Steeles Ave and Bathurst St',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=7131+Bathurst+St+Unit+103+Thornhill+ON+L4J+7Z1',
  mapsEmbed: 'https://maps.google.com/maps?q=7131%20Bathurst%20St%2C%20Thornhill%2C%20ON%20L4J%207Z1&z=15&output=embed',
  googleRating: 'Excellent',
  googleCount: 40,
  about: 'Beauty Medical Clinic is a non-surgical anti-aging clinic in Thornhill, Ontario, led by Registered Nurse and Certified Advanced Cosmetic Injector Rebecca Victoria Adam, who has more than 30 years in medicine and trains doctors and nurses in Botox, dermal fillers and sclerotherapy.'
};

const CATEGORIES = [
  { id: 'injectables', name: 'Injectables', blurb: 'Smooth, restore and refine with precise, conservative injections.' },
  { id: 'skin', name: 'Skin renewal', blurb: 'Collagen, clarity and glow, from peels to radio frequency.' },
  { id: 'body', name: 'Body & veins', blurb: 'Contour, firm and clear spider veins without surgery.' },
  { id: 'hair', name: 'Hair', blurb: 'The clinic’s own protocol for thinning and hair loss.' }
];

/* Short Google review excerpts as they appear on the old site (Trustindex widget). */
const REVIEWS = [
  { name: 'Kathryn K.', text: 'She fixed my spider veins. She is a miracle worker! Extremely meticulous, professional and experienced… She prefers to under-treat rather than over-treat and I really appreciate her honesty.' },
  { name: 'Olga D.', text: 'My favourite procedure was the Hydro Facial <span class="pl">+</span> Forma — the results were IMMEDIATE and the following day I went out without any makeup and received compliments even from strangers!' },
  { name: 'Liuba Y.', text: 'I’ve had spider veins which bothered me for years. Thanks to Victoria, we are approaching the final result. Victoria is a very professional and caring specialist.' },
  { name: 'Karen T.', text: 'Victoria is a highly professional and gifted practitioner. She is honest, caring, and will always do her absolute best to give you what you are looking for.' },
  { name: 'Julie B.', text: 'Incredible service, true master of her craft. Victoria is attentive, knowledgeable and very professional.' },
  { name: 'Stella I.', text: 'I had my spider veins removed by Victoria. She did an amazing job! She is very skilled and attentive.' },
  { name: 'Alina K.', text: 'Excellent professional service. I felt like I was in good hands the whole time and I couldn’t be happier with my experience.' },
  { name: 'Nadia T.', text: 'Victoria is the best! Exceptionally good service, truly caring for her clients.' }
];

/* Face map on the home page: points are % of face-map-consultation.webp (1340x1200). */
const ZONES = [
  { id: 'scalp', label: 'Hair & scalp', x: 20.9, y: 18.3, concern: 'Thinning, shedding, a widening part', t: ['hair-loss-and-thinning-treatment', 'prp-rejuvenation'] },
  { id: 'forehead', label: 'Forehead', x: 33.6, y: 21, concern: 'Horizontal lines', t: ['botox-dysport', 'radiofrequency-skin-tightening'] },
  { id: 'frown', label: 'Frown lines', x: 36.6, y: 32.5, concern: 'The “11s” between the brows', t: ['botox-dysport'] },
  { id: 'eyes', label: 'Crow’s feet', x: 19.7, y: 38, concern: 'Lines at the outer eye', t: ['botox-dysport', 'radiofrequency-skin-tightening'] },
  { id: 'undereye', label: 'Under the eyes', x: 47.8, y: 44.7, concern: 'Dark circles, puffiness', t: ['prp-rejuvenation', 'endospheres-therapy'] },
  { id: 'cheeks', label: 'Cheeks & midface', x: 50, y: 52, concern: 'Lost volume, flattened cheekbones', t: ['dermal-fillers', 'cinderella-facelift', 'endospheres-therapy'] },
  { id: 'folds', label: 'Smile lines', x: 32.5, y: 54.7, concern: 'Nasolabial folds', t: ['dermal-fillers', 'radiofrequency-skin-tightening'] },
  { id: 'lips', label: 'Lips', x: 39.6, y: 59.2, concern: 'Volume, shape, fine lines', t: ['your-perfect-lips', 'cinderella-facelift'] },
  { id: 'jaw', label: 'Jawline', x: 20.9, y: 66.7, concern: 'Softening contour, jowls', t: ['dermal-fillers', 'radiofrequency-skin-tightening', 'salt-and-silk-facial'] },
  { id: 'chin', label: 'Chin', x: 36.6, y: 69.7, concern: 'Shape and projection', t: ['dermal-fillers'] },
  { id: 'neck', label: 'Neck', x: 28.4, y: 84, concern: 'Crepey, dehydrated skin', t: ['skin-boosters', 'prp-rejuvenation', 'radiofrequency-skin-tightening'] },
  { id: 'skin', label: 'Overall skin', x: 54, y: 30, concern: 'Pores, scars, pigment, dullness', t: ['microneedling', 'mesotherapy', 'lumecca', 'organic-peel'] }
];

const T = [];

/* ───────────── INJECTABLES ───────────── */
T.push({
  slug: 'botox-dysport', cat: 'injectables',
  name: 'Botox & Dysport', short: 'Botox & Dysport',
  title: 'Botox & Dysport in Thornhill | Beauty Medical Clinic',
  desc: 'Botox and Dysport for frown lines, forehead lines and crow’s feet in Thornhill. About 10 minutes, no downtime, by an RN injector. Call 416-728-5697.',
  img: 'botox-frown-line-injection', imgAlt: 'A gloved injector placing a fine-needle injection between a relaxed woman’s brows to soften frown lines',
  card: 'Softens frown lines, forehead lines and crow’s feet. About 10 minutes, no downtime.',
  lede: 'Botox and Dysport relax the small muscles that fold the skin into expression lines. The appointment takes about ten minutes, you can go straight back to your day, and the full effect shows at around two weeks.',
  facts: [['Treatment time', 'About 10 minutes'], ['Downtime', 'None'], ['First results', '2–4 days'], ['Full effect', '10–14 days'], ['Typically lasts', '3–5 months']],
  sections: [
    { h: 'What are Botox and Dysport?', html: `
      <p>Both are brands of botulinum toxin type A, a purified protein that temporarily quiets a muscle. Botox Cosmetic also contains human albumin and sodium chloride. Dysport contains human serum albumin and lactose, and may carry trace cow’s-milk protein, which matters if you have a milk-protein allergy.</p>
      <p>In medicine it is used for muscle spasms and severe underarm sweating. Cosmetically, it softens:</p>
      <ul class="ticks"><li>Frown lines between the eyebrows</li><li>Horizontal forehead lines</li><li>Crow’s feet</li><li>Marionette lines at the corners of the mouth</li><li>Smoker’s lines around the lips</li></ul>
      <p>As a rule, Botox or Dysport works best in the upper face, while <a href="../dermal-fillers/">dermal fillers</a> do most of the work lower down. They are different tools: fillers add volume under a line, Botox stops the muscle from creasing it.</p>` },
    { h: 'How does it work?', html: `
      <p>A wrinkle forms at right angles to the muscle beneath it. The forehead muscle runs vertically, so raising your brows creates horizontal lines; the two frown muscles sit almost horizontally, so they make vertical “11s”. Botox is injected into those muscles and blocks the nerve signal that makes them contract. Without the contraction, the skin above has a hard time creasing.</p>
      <p>Lines that are still visible when your face is completely relaxed often need a combination: Botox to soften the movement and a filler to lift what is left.</p>
      <p>It takes two to four days to bind to the nerve endings, so improvement starts within days and peaks at about 10–14 days. Whatever you see at two weeks is the full result.</p>` },
    { h: 'Who should not have it', html: `
      <p>Please tell Rebecca about your health and medications at your consultation. Botox and Dysport are not right for you if you have:</p>
      <ul class="cols"><li>ALS (Lou Gehrig’s disease)</li><li>Myasthenia gravis</li><li>Autonomic neuropathy</li><li>Lambert-Eaton syndrome or another muscle or nerve disease</li><li>Difficulty swallowing</li><li>Weak forehead muscles or drooping eyelids</li><li>A current viral infection</li><li>Antibiotic treatment with gentamicin or amikacin</li><li>Albumin or cow’s-milk protein sensitivity (Dysport)</li></ul>
      <p>It is also not given if you are pregnant, trying to conceive, or breastfeeding. It is always better to be safe: you can have it later.</p>` },
    { h: 'Side effects, and how an experienced injector avoids them', html: `
      <p>Possible effects include tenderness, bruising, swelling, redness or itching where the needle went in, and less often dry mouth, tiredness, headache or neck pain. Product can occasionally spread a little beyond the target muscle; near the brows this can make an eyelid droop for a while.</p>
      <p>Knowing the exact injection points, and using a small concentrated dose rather than a large diluted one, is what keeps product where it belongs. That is why who injects you matters more than anything else. Six habits keep you safe:</p>
      <ol class="steps"><li>Choose an experienced medical professional, never a salon or a “Botox party”, where there is no emergency equipment and counterfeit or over-diluted product has been reported.</li><li>Tell your injector about every health condition.</li><li>List all medications, vitamins and supplements, especially injected antibiotics, muscle relaxants, allergy or cold medicine and sleep aids.</li><li>Follow your pre- and post-treatment instructions exactly.</li><li>Report any side effect that bothers you or doesn’t go away.</li><li>Have it done in a medical setting where any reaction can be treated straight away.</li></ol>` }
  ],
  faq: [
    ['Does Botox hurt?', 'Very little. The needles are tiny, and a numbing cream or cold pack can be applied 10–20 minutes beforehand, so most people feel only a quick pinch, if anything.'],
    ['What is recovery like?', 'You can go straight back to work. Keep your head upright for the rest of the day and don’t rub or massage the treated area, so the product stays exactly where it was placed.'],
    ['How long does Botox last?', 'Most people enjoy the effect for three to five months. Age, facial structure and expressions, smoking, diet, skincare, sun damage and repeat use can all shorten or lengthen that.'],
    ['How often can I have it?', 'Not more often than every three months in the same area. Injecting more often, or in larger amounts, raises the chance your body forms antibodies that make it less effective.'],
    ['Botox or filler: which do I need?', 'Botox relaxes the muscle that creases a line; filler lifts a line or restores volume. Botox usually suits the upper face, fillers the cheeks, lips, folds and jaw. Many people benefit from both, which Rebecca will map out at your consultation.']
  ],
  gallery: [['botox-units-by-area-chart', 'A diagram of the face showing typical Botox treatment areas: forehead lines, frown lines, crow’s feet, bunny lines, lip lines and the chin', 'Common treatment areas']],
  quotes: [['I am very happy!! I don’t even appear to bruise. Thank you for being someone that is so talented and trustworthy, Victoria!', 'Amber S.'], ['I was very nervous of needles and you helped me by talking me through it. You are competent, knowledgeable, and professional.', 'Debbie V.']],
  related: ['dermal-fillers', 'skin-boosters', 'radiofrequency-skin-tightening']
});

T.push({
  slug: 'dermal-fillers', cat: 'injectables',
  name: 'Dermal Fillers', short: 'Dermal fillers',
  title: 'Dermal Fillers in Thornhill | Beauty Medical Clinic',
  desc: 'Hyaluronic acid fillers for cheeks, lips, chin, jawline and smile lines in Thornhill. Natural, results you see right away. Book with Rebecca Victoria Adam, RN.',
  img: 'dermal-filler-lip-injection', imgAlt: 'An injector placing dermal filler with a fine needle',
  card: 'Hyaluronic acid to restore volume and sculpt cheeks, chin, jaw and folds. Results right away.',
  lede: 'Hyaluronic acid (HA) fillers smooth lines and replace the fullness the face loses with time. Placed well, the right filler in the right spot gives a natural lift without surgery, and you see the result as you leave.',
  facts: [['Treatment time', 'A few minutes to an hour'], ['Results', 'Immediate'], ['Swelling', 'Usually a few hours'], ['Products', 'Juvéderm, Restylane, Emervel']],
  sections: [
    { h: 'Where fillers work', html: `
      <p>HA fillers are among the safest and most effective injectables for lines, creases and lost volume. They are excellent for face sculpting in these areas:</p>
      <ul class="ticks cols"><li>Cheeks</li><li>Midface</li><li>Nasolabial folds (beside the nose)</li><li>Chin</li><li>Lips</li><li>Jawline</li></ul>
      <p>For wrinkles, filler adds natural volume beneath the line to lift and smooth it. For contours, it corrects deep folds and lifts the cheeks and chin. In the lips, it is placed inside the lip for fullness and along the border for definition, which also helps stop lipstick bleeding into fine lines. See <a href="../your-perfect-lips/">lip fillers</a>.</p>` },
    { h: 'Why hyaluronic acid?', html: `
      <p>HA occurs naturally in the body, and almost half of it is in the skin, where it binds up to 1,000 times its weight in water to keep skin plump and hydrated. As we age we make less of it; skin thins, stretches and loses elasticity, and everyday expressions etch lines deeper.</p>
      <p>HA fillers hold their shape using the body’s own moisture, last longer than older fat or collagen injections, and are not made from animals, so there is no risk of animal-borne disease or reactions in people sensitive to foods like beef, chicken or eggs. <a href="../skin-boosters/">Skin boosters</a> use the same ingredient to hydrate rather than volumize.</p>` },
    { h: 'What happens during treatment', html: `
      <ol class="steps"><li>Numbing cream can be applied to reduce discomfort.</li><li>The skin is cleansed with an antiseptic.</li><li>The clear gel is placed with a fine needle, at a depth that matches the line or area being treated. Several small injections may be used.</li><li>Rebecca gently massages the area so it blends with the surrounding contours.</li><li>Ice may be applied for a few minutes to limit swelling.</li></ol>
      <p>Because it is quick, many clients come in on a lunch hour and go back to work.</p>` },
    { h: 'After your appointment', html: `
      <ul class="ticks"><li>Results are visible straight away.</li><li>Redness and swelling are normal for up to a few hours.</li><li>Tenderness can last a few hours or a few days.</li><li>The area may feel firm for one to two weeks before it softens and settles.</li></ul>
      <p>Bruising is the most common side effect. Studies put it anywhere from about one in five patients to two in three, and it is most likely in the tear troughs, upper lip and marionette lines. The preparation below lowers your chances.</p>` },
    { h: 'How to prepare: two weeks before', id: 'prepare', html: `
      <ul class="ticks"><li>Stop anti-inflammatory painkillers such as naproxen, aspirin and ibuprofen (Advil, Motrin), unless your doctor has prescribed them.</li><li>Avoid natural blood thinners: vitamin E, ginger, garlic, green tea, fish oil and omega-3.</li><li>Avoid alcohol.</li><li>Arnica, a homeopathic remedy, taken for four days before and four days after may help prevent bruising: four pellets under the tongue, three times a day.</li></ul>` }
  ],
  faq: [
    ['How long does filler treatment take?', 'Anywhere from a few minutes to about an hour, depending on how many areas are treated.'],
    ['When will I see results?', 'Immediately. Some swelling and firmness can soften the final shape for a week or two while the filler settles.'],
    ['Will I bruise?', 'You might. Bruising is the most common side effect, especially under the eyes and around the mouth. Following the two-week preparation steps above reduces the risk.'],
    ['Which brands do you use?', 'Hyaluronic acid fillers such as Juvéderm, Restylane and Emervel. Rebecca chooses the product to suit the area and the look you want.']
  ],
  gallery: [
    ['dermal-fillers-before-after-1', 'Before and after dermal filler treatment, front view of a client’s lower face', 'Dermal fillers · before / after'],
    ['dermal-fillers-before-after-2', 'Before and after dermal filler treatment showing softened folds', 'Dermal fillers · before / after'],
    ['dermal-fillers-before-after-3', 'Before and after dermal fillers on the midface', 'Dermal fillers · before / after'],
    ['dermal-fillers-before-after-4', 'Before and after dermal fillers, side profile of the cheek and jaw', 'Dermal fillers · before / after']
  ],
  quotes: [['When you visit Victoria’s clinic for a consultation, you’ll certainly be impressed by her passion, professionalism and honesty.', 'Kim D.'], ['The best anti-ageing clinic around, hands down. Victoria is professional and educated on all the treatments.', 'Lisa L.']],
  related: ['your-perfect-lips', 'botox-dysport', 'cinderella-facelift']
});

T.push({
  slug: 'your-perfect-lips', cat: 'injectables',
  name: 'Lip Fillers', short: 'Lip fillers',
  title: 'Natural Lip Fillers in Thornhill | Beauty Medical Clinic',
  desc: 'Natural-looking lip fillers in Thornhill with hyaluronic acid that can be reversed. Conservative, tailored to your face. Call or text 416-728-5697.',
  img: 'lip-filler-injection', imgAlt: 'Close-up of a fine needle placing hyaluronic acid filler in the lip',
  card: 'A conservative, natural plump with reversible hyaluronic acid. Lasts about 6–12 months.',
  lede: 'Whether it is your first time or you want to refine what you have, the goal is lips that look like yours, only better. Five principles guide every lip treatment at the clinic.',
  facts: [['Filler type', 'Hyaluronic acid'], ['Typically lasts', '6–12 months'], ['Reversible', 'Yes, with hyaluronidase'], ['Consultation', 'Complimentary']],
  sections: [
    { h: 'Five rules for a beautiful lip result', html: `
      <div class="rules">
        <div><b>01</b><h3>Choose an injector you trust</h3><p>Experience comes first. A good injector answers every question, explains your options, and has done a great many lips.</p></div>
        <div><b>02</b><h3>Choose the right filler</h3><p>There are many kinds. If you are new to filler, a hyaluronic acid product such as Juvéderm, Restylane or Emervel is the sensible start: if you don’t love it, an enzyme called hyaluronidase dissolves it.</p></div>
        <div><b>03</b><h3>Be conservative</h3><p>Too little is always better than too much. Start small and build toward your goal. If people can tell you’ve had filler, it has probably gone too far.</p></div>
        <div><b>04</b><h3>Be specific</h3><p>Almost everyone asks for “natural”, but that means something different to each person. Describe exactly what you want so expectations are clear.</p></div>
        <div><b>05</b><h3>Keep expectations realistic</h3><p>Bring inspiration photos, but very full lips don’t suit every face. Rebecca will advise what will look right on yours.</p></div>
      </div>` },
    { h: 'Not sure yet? Try it for an evening first', html: `<p>If you have wondered whether a fuller pout would suit you, the <a href="../cinderella-facelift/">Cinderella lips</a> treatment uses sterile saline to give a temporary plump that fades within hours, so you can see the look before committing.</p>` }
  ],
  faq: [
    ['How long do lip fillers last?', 'Most last about 6 to 12 months, depending on your body and how active you are.'],
    ['Can lip filler be undone?', 'Hyaluronic acid filler can be dissolved with an injection of hyaluronidase if you dislike the result.'],
    ['Is the consultation free?', 'Yes. Call or text 416-728-5697 to book a complimentary lip consultation.']
  ],
  gallery: [['lip-filler-before-after', 'Before and after lip filler: the lower photo shows fuller, smoother, well-defined lips', 'Lip filler · before / after']],
  quotes: [],
  related: ['dermal-fillers', 'cinderella-facelift', 'botox-dysport']
});

T.push({
  slug: 'cinderella-facelift', cat: 'injectables',
  name: 'Cinderella Facelift & Lips', short: 'Cinderella facelift',
  title: 'Cinderella Facelift & Cinderella Lips in Thornhill',
  desc: 'Cinderella lips and facelift in Thornhill: a temporary saline plump that lasts one evening. Try a fuller look before fillers. Call 416-728-5697.',
  img: 'cinderella-facelift-glow', imgAlt: 'A woman with smooth, glowing skin and softly defined cheeks',
  card: 'A saline “try before you buy” plump for lips or cheeks that lasts one evening.',
  lede: 'A temporary saline plump for the lips, cheeks or other areas that lasts about one evening, then fades. It is ideal for a wedding, party, photo shoot or date, and an inexpensive way to try a fuller look before you commit to longer-lasting filler.',
  facts: [['What is injected', 'Sterile saline'], ['Effect lasts', 'About 8–12 hours'], ['Results', 'Immediate'], ['Areas', 'Lips, cheeks, other areas of the face']],
  sections: [
    { h: 'Why it is called Cinderella', html: `
      <p>Like Cinderella’s evening at the ball, the effect wears off after the night is over. Sterile saline is injected along the lip line, into the cheeks or other parts of the face, the change is visible straight away, and it fades within about eight to twelve hours.</p>
      <p>The trend started in Europe, and Beauty Medical Clinic was among the first clinics in the Toronto area to introduce Cinderella Lips and Cinderella Facelifts.</p>` },
    { h: 'Who it is for', html: `
      <blockquote class="pull"><p>“Many women tell me they’ve thought about lip or cheek fillers but were never sure whether a fuller pout or more defined features would be right for them. This lets them try it first, see how friends and family react, and grow comfortable with the change.”</p><cite>Rebecca Victoria Adam, RN, Certified Aesthetic Injector</cite></blockquote>
      <ul class="ticks"><li>Weddings, galas, holiday parties and New Year’s</li><li>Photo sessions and special occasions</li><li>Anyone curious about filler who wants to see the look first</li></ul>` },
    { h: 'Inexpensive, but still a medical treatment', html: `<p>It is quick and simple, but it is still an injection. Rebecca’s advice: choose someone experienced and properly qualified, with a good eye for facial anatomy, who will tell you when enough is enough. The result should look natural and enhance your features rather than change them.</p>` }
  ],
  faq: [
    ['How long do Cinderella lips last?', 'About eight to twelve hours, which is enough for one event.'],
    ['Is it the same as filler?', 'No. It uses sterile saline, which the body absorbs within hours. Hyaluronic acid filler lasts months. Many people try Cinderella first, then move on to filler.']
  ],
  gallery: [],
  quotes: [],
  related: ['your-perfect-lips', 'dermal-fillers', 'salt-and-silk-facial']
});

T.push({
  slug: 'skin-boosters', cat: 'injectables',
  name: 'Skin Boosters', short: 'Skin boosters',
  title: 'Restylane Skinboosters in Thornhill | Beauty Medical Clinic',
  desc: 'Restylane Skinboosters in Thornhill: hyaluronic acid micro-injections that hydrate the face, neck, hands and décolletage. Book with Rebecca Victoria Adam, RN.',
  img: 'skin-boosters-hydration', imgAlt: 'A woman with dewy, hydrated skin surrounded by a splash of water',
  card: 'Micro-injections of hyaluronic acid that hydrate skin from within. Face, neck, hands.',
  lede: 'Skin boosters are tiny injections of hyaluronic acid into the skin itself. Unlike fillers they don’t add shape or volume; they hydrate, so skin becomes smoother, more radiant and more elastic.',
  facts: [['Course', '2–3 sessions, 2–4 weeks apart'], ['Maintenance', 'About every 6 months'], ['Areas', 'Face, neck, hands, décolletage'], ['Product', 'Restylane Skinboosters']],
  sections: [
    { h: 'How skin boosters differ from filler', html: `<p>Filler is placed beneath the skin to lift and sculpt. Skin boosters are placed within the skin, in a fine grid over larger areas, to improve skin quality. They suit the face, neck, hands and décolletage, places where skin shows dryness and crepiness first.</p>` },
    { h: 'Your treatment plan', html: `
      <ul class="ticks"><li>Two to three sessions, two to four weeks apart, restore elasticity and smoothness gradually.</li><li>A maintenance session about every six months keeps the result.</li><li>According to the manufacturer, clinical studies show improved elasticity in the face and hands for up to 12 months after the first course, and Restylane Skinboosters have been used for more than 12 years with over 3.5 million treatments.</li></ul>` }
  ],
  faq: [['Will skin boosters change the shape of my face?', 'No. They hydrate and improve the quality of the skin rather than adding volume. For shape and volume, see dermal fillers.']],
  gallery: [['skin-boosters-treatment-areas', 'Diagram of the most requested skin booster areas: forehead, around the eyes, around the mouth, neck and hands', 'Most requested treatment areas']],
  quotes: [],
  related: ['mesotherapy', 'dermal-fillers', 'microneedling']
});

/* ───────────── SKIN ───────────── */
T.push({
  slug: 'microneedling', cat: 'skin',
  name: 'Microneedling', short: 'Microneedling',
  title: 'Microneedling for Acne Scars & Pores in Thornhill',
  desc: 'Microneedling (collagen induction therapy) in Thornhill for acne scars, large pores, stretch marks and wrinkles. Safe for more skin tones than many lasers.',
  img: 'microneedling-pen-treatment', imgAlt: 'A microneedling pen being glided across a client’s cheek',
  card: 'Collagen induction for acne scars, pores, stretch marks and fine lines.',
  lede: 'Microneedling, or collagen induction therapy, uses a pen of fine needles to make tiny, controlled channels in the skin. Your skin heals them by producing new collagen and elastin, so it becomes thicker, smoother and more even over the following months.',
  facts: [['Typical course', '3 sessions, ~4 weeks apart'], ['Downtime', 'Pink for 2–4 days'], ['Results', 'Keep improving for up to 6 months'], ['Areas', 'Face, neck, body']],
  sections: [
    { h: 'What it treats', html: `<ul class="ticks cols"><li>Acne scars</li><li>Large pores</li><li>Uneven tone and texture</li><li>Stretch marks</li><li>Fine lines and wrinkles</li><li>Pigmentation</li></ul>
      <p>It is neither a laser nor a deep chemical peel. Some lasers don’t suit skin that tends toward hyperpigmentation, including many darker skin tones, because of the heat. Microneedling is tolerated by a much wider range of skin types.</p>` },
    { h: 'How it works', html: `<p>The micro-injuries switch on the skin’s wound-healing phase, which produces collagen. During the session a concentrated sterile serum containing hyaluronic acid is applied; the micro-channels help it absorb deeply, adding moisture and stimulating the cells that make collagen and elastin.</p>
      <ol class="steps"><li>A thin layer of serum is applied to clean skin.</li><li>The needle depth is set for your skin and the concern being treated.</li><li>The pen is glided gently across the area.</li></ol>` },
    { h: 'Downtime and results', html: `<p>Right afterwards your skin has a healthy pink glow. Most people are pink for two to four days; some are fully healed in 24 hours, and you can be back in public within about five days at most. Skin looks healthier almost immediately, and collagen keeps remodelling for up to six months after your last session.</p>
      <p>Most people have three sessions about four weeks apart. Deep wrinkles, acne scars, stretch marks or advanced sun damage usually need three to six sessions at two- to four-week intervals.</p>
      <ul class="ticks cols"><li>Not painful</li><li>Short healing time</li><li>Cost effective</li><li>Safe on thin skin</li><li>Can be repeated</li><li>Works on laser-resurfaced skin</li></ul>
      <p>Microneedling is also combined with <a href="../prp-rejuvenation/">PRP</a> for a stronger collagen response.</p>` },
    { h: 'Before your treatment', id: 'aftercare', html: `<div class="care"><div><h3>Before</h3><ul class="ticks">
      <li>No treatment on sunburned skin. Avoid sun, tanning beds and self-tanner for at least 24 hours before and after, ideally a week. Treating soon after heavy sun can cause light or dark spots that may last months.</li>
      <li>Arrive with clean skin: no lotion, makeup or sunscreen.</li>
      <li>Stop Accutane and other photosensitizing medication at least 6 months before and during your course.</li>
      <li>No chemical peel on the area for 2 weeks before and after.</li>
      <li>No Retin-A, Renova or Tazorac for 1 week before and after.</li>
      <li>No waxing or depilatory creams for 2 weeks before and after. Shaving is fine right before, and 48–72 hours after if there is no irritation.</li>
      <li>Not during pregnancy.</li>
      <li>Tell us about any tattoos near the area, including cosmetic tattoos; they are avoided.</li>
      <li>If you get cold sores, you may be advised to take a preventive antiviral (such as Valtrex or acyclovir).</li></ul></div>
      <div><h3>After</h3><ul class="ticks">
      <li>A sunburn-like look and feel is normal for 1–3 days: tight, dry, a little swollen or sensitive. Darker areas may flake off within a week; let them, without picking or scrubbing.</li>
      <li>Wash gently twice a day with a mild cleanser and lukewarm water.</li>
      <li>Use a soothing moisturizer as often as needed for 3 days.</li>
      <li>Avoid sun for at least 24 hours, ideally 1–2 weeks. Wear a hat and SPF 30+ for any incidental sun.</li>
      <li>No exfoliating products for at least 1 week.</li>
      <li>No sweaty exercise, hot tub, sauna or steam while there is irritation.</li>
      <li>Advil or Tylenol is fine for discomfort; ice packs help swelling. Sleep on your back with your head slightly raised.</li>
      <li>No makeup for 12 hours.</li></ul></div></div>` }
  ],
  faq: [
    ['How many microneedling sessions will I need?', 'Most people have three, about four weeks apart. Acne scars, stretch marks and deep lines usually need three to six at two- to four-week intervals.'],
    ['What is the downtime?', 'Usually two to four days of pinkness, sometimes only 24 hours.'],
    ['Which areas can be treated?', 'Face, neck, décolleté, arms, hands, legs, abdomen and back, which makes it useful for acne scars and stretch marks alike.'],
    ['Is microneedling safe for darker skin?', 'It is tolerated by a wider range of skin tones than many heat-based lasers, because it doesn’t rely on heat.']
  ],
  gallery: [
    ['microneedling-before-after-1', 'Before and after microneedling on a cheek with acne scarring', 'Microneedling · before / after'],
    ['microneedling-before-after-2', 'Before and after microneedling showing smoother skin texture', 'Microneedling · before / after'],
    ['microneedling-before-after-3', 'Before and after microneedling for acne scars', 'Microneedling · before / after'],
    ['microneedling-before-after-4', 'Before and after a microneedling course on the lower face', 'Microneedling · before / after']
  ],
  quotes: [['Am very pleased with the degree of professionalism and knowledge. Exceptional results that are a combination of artistry and skill.', 'Annette L.']],
  related: ['prp-rejuvenation', 'mesotherapy', 'organic-peel']
});

T.push({
  slug: 'prp-rejuvenation', cat: 'skin',
  name: 'PRP Rejuvenation', short: 'PRP rejuvenation',
  title: 'PRP (Platelet-Rich Plasma) Skin & Hair Treatment, Thornhill',
  desc: 'PRP rejuvenation in Thornhill uses your own platelets for skin tone, dark circles, the neck and hair loss. Often paired with microneedling. Call 416-728-5697.',
  img: 'hair-prp-scalp-treatment', imgAlt: 'A gloved practitioner injecting platelet-rich plasma with a fine needle',
  card: 'Your own platelets for tone, texture, dark circles, the neck and hair.',
  lede: 'Platelet-rich plasma (PRP) uses your own blood to help your skin repair itself. A small sample is spun to concentrate the platelets, which carry growth factors, and that plasma is placed back into the skin or scalp to stimulate collagen and healthy new cells.',
  facts: [['Uses', 'Skin, under-eyes, neck, hair'], ['First changes', 'About 4 weeks'], ['Best results', '6–12 weeks'], ['Can last', '12+ months']],
  sections: [
    { h: 'How PRP works', html: `<ol class="steps"><li>A small amount of blood is drawn, as for a routine test.</li><li>It is spun in a centrifuge, which separates the red cells from a golden plasma rich in platelets and white cells.</li><li>The concentrated plasma is injected into the area being treated.</li></ol>
      <p>Platelets exist to stop bleeding and heal tissue, and they release growth factors that support new cell growth. Athletes have long used PRP for tendon and joint injuries. In the skin, it stimulates collagen and boosts circulation, which is where the immediate rosy glow comes from, then helps tighten, smooth and even out tone.</p>` },
    { h: 'What it is used for', html: `<ul class="ticks cols"><li><a href="../hair-loss-and-thinning-treatment/">Hair loss</a></li><li>Dark circles under the eyes</li><li>Neck rejuvenation</li><li>With <a href="../microneedling/">microneedling</a></li><li>With hyaluronic acid fillers</li></ul>` },
    { h: 'PRP and microneedling together', html: `<p>Both stimulate collagen and they work better together: microneedling works from the surface while PRP works beneath it. Results are gradual. Changes start to show at about four weeks, with clear improvement in tone and texture at six to twelve weeks, and the result can last a year or more.</p>` },
    { h: 'When PRP is not suitable', html: `<p>PRP is safe for almost everyone, but it is not done if you have:</p><ul class="cols"><li>Very low platelet count</li><li>Haemodynamic instability</li><li>Sepsis, or an acute or chronic infection</li><li>Chronic liver disease</li><li>Anticoagulant therapy (warfarin, dabigatran, heparin)</li><li>Cancer</li><li>Corticosteroid treatment</li><li>A recent fever or illness</li></ul>` }
  ],
  faq: [
    ['When will I see results from PRP?', 'Usually from about four weeks, with the biggest change between six and twelve weeks. Many people simply look more rested and fresh.'],
    ['How long does PRP last?', 'Results can last 12 months or more.'],
    ['Can PRP be combined with other treatments?', 'Yes. The clinic most often pairs it with microneedling, and it is part of the hair-loss protocol alongside mesotherapy.']
  ],
  gallery: [],
  quotes: [],
  related: ['microneedling', 'hair-loss-and-thinning-treatment', 'mesotherapy']
});

T.push({
  slug: 'mesotherapy', cat: 'skin',
  name: 'Mesotherapy', short: 'Mesotherapy',
  title: 'Mesotherapy Facial Rejuvenation in Thornhill',
  desc: 'Mesotherapy in Thornhill: micro-injections of hyaluronic acid, vitamins and amino acids for hydrated, glowing skin, finished with red LED. 15–30 minutes.',
  img: 'mesotherapy-hydrated-skin', imgAlt: 'A woman with fresh, hydrated skin touching her face as water splashes around her',
  card: 'A vitamin and hyaluronic acid cocktail for dull, tired skin, finished with red LED.',
  lede: 'Mesotherapy delivers a cocktail of hyaluronic acid, vitamins, minerals and amino acids into the middle layer of the skin through a series of very fine injections. It nourishes and hydrates while stimulating the collagen and elastin that keep skin firm.',
  facts: [['Treatment time', '15–30 minutes'], ['Course', '4–6 sessions, every 2 weeks'], ['Maintenance', '1–2 times a year'], ['Downtime', 'Minor, settles within 24 hours']],
  sections: [
    { h: 'What to expect', html: `<p>It can be slightly uncomfortable, so numbing cream is available for sensitive skin. Any small bruises or swelling settle within about 24 hours. Over the course, skin becomes more radiant, hydrated and firm, with better texture.</p>` },
    { h: 'Benefits', html: `<ul class="ticks"><li>Brightens dull, tired-looking skin and softens superficial wrinkles</li><li>Improves sluggish circulation</li><li>Helps with pigmentation and acne scarring</li><li>Boosts the results of Botox or Dysport, fillers, microneedling and laser</li></ul>` },
    { h: 'Finished with red LED', html: `<p>Every mesotherapy session at the clinic ends with red LED light therapy. Red light supports the skin barrier, speeds healing, calms inflammation and encourages new collagen. It also acts on the oil glands to reduce the inflammatory signals behind chronic acne.</p>` }
  ],
  faq: [['How many mesotherapy sessions do I need?', 'A course of four to six sessions, every two weeks, then maintenance once or twice a year.']],
  gallery: [],
  quotes: [],
  related: ['skin-boosters', 'microneedling', 'hair-loss-and-thinning-treatment']
});

T.push({
  slug: 'organic-peel', cat: 'skin',
  name: 'Organic Herbal Peel', short: 'Organic herbal peel',
  title: 'Organic Herbal Green Peel in Thornhill | Beauty Medical Clinic',
  desc: 'Organic herbal (green) peel in Thornhill for sun damage, acne, scars and uneven tone. Visible change after one session. Pre- and post-care inside.',
  img: 'organic-herbal-peel', imgAlt: 'A woman holding fresh green herbs against her cheek',
  card: 'A plant-based peel for sun damage, acne, scars and uneven tone.',
  lede: 'A gentle but effective way to step up your skincare: the organic herbal peel counteracts summer sun damage, improves tone and texture, speeds cell renewal and helps with acne and scarring.',
  facts: [['Course', 'Every 2 weeks for 2 months'], ['Results', 'Visible after one session'], ['Base', 'Plant particles, salicylic acid, vitamins']],
  sections: [
    { h: 'What is in it', html: `<p>The peel is a blend of finely crushed whole plants, salicylic acid and multivitamins. Its key plant is <i>Spongilla fluviatilis</i>, a freshwater sponge also known as badyaga, which is rich in silica, lime and alumina. Silica supports healthy collagen; alumina and lime boost circulation.</p>` },
    { h: 'Peel care instructions', id: 'aftercare', html: `<div class="care"><div><h3>Before</h3><ul class="ticks">
      <li>Avoid sun, tanning beds and self-tanner for at least 24 hours before, ideally a week.</li>
      <li>Stop Accutane and other photosensitizing medication at least 6 months before and during treatment.</li>
      <li>No other chemical peel on the area for 2 weeks before.</li>
      <li>No Retin-A, Renova or Tazorac for 1 week before.</li>
      <li>Not during pregnancy.</li>
      <li>Arrive with clean skin: no lotion, makeup or sunscreen.</li></ul></div>
      <div><h3>After</h3><ul class="ticks">
      <li>Avoid sun for at least 24 hours, ideally 1–2 weeks. Hat and SPF 30+ for incidental sun.</li>
      <li>Wash gently twice a day with a mild cleanser and lukewarm water.</li>
      <li>Moisturize with a soothing cream as often as needed for 3 days.</li>
      <li>Let old skin flake off naturally: no picking or exfoliating.</li>
      <li>No exfoliating products for at least 1 week, and no other peel for 2 weeks.</li>
      <li>No Retin-A, Renova or Tazorac for 1 week.</li>
      <li>No sweaty exercise, hot tub, sauna or steam for 5 days if there is irritation.</li>
      <li>No makeup for 12 hours.</li></ul></div></div>` }
  ],
  faq: [['How many herbal peels do I need?', 'You will see a difference after one, but the best result comes from one peel every two weeks for two months.']],
  gallery: [['organic-peel-before-after', 'Before and after an organic herbal peel, showing clearer, more even skin', 'Organic peel · before / after']],
  quotes: [],
  related: ['microneedling', 'lumecca', 'mesotherapy']
});

T.push({
  slug: 'salt-and-silk-facial', cat: 'skin',
  name: 'Salt & Silk Facial', short: 'Salt & Silk facial',
  title: 'Salt & Silk Facial with RF Contouring | Thornhill',
  desc: 'The Salt & Silk Facial in Thornhill: saline cleanse, silk hydration, radio frequency and jawline contouring, plus a complimentary collagen mask and massage.',
  img: 'facial-mask-treatment', imgAlt: 'A gloved practitioner smoothing a creamy facial mask over a relaxed client’s cheek and chin',
  card: 'A luxurious saline-and-silk ritual with radio frequency and jawline contouring.',
  lede: 'A next-level rejuvenation ritual that combines a pure cleanse and deep hydration with radio frequency and jawline contouring to lift and define, then finishes with a collagen mask and a relaxing facial massage.',
  facts: [['Includes', 'RF + jawline contouring'], ['Finish', 'Collagen mask & facial massage'], ['Feel', 'Radiant, refreshed, baby-soft']],
  sections: [
    { h: 'The ritual, step by step', html: `<ol class="steps"><li><b>Salt.</b> A soothing cleanse with pure normal saline.</li><li><b>Silk.</b> A silky infusion that hydrates and softens the complexion.</li><li><b>Sculpt.</b> Advanced radio frequency and jawline contouring techniques lift features and improve tone and definition.</li><li><b>Restore.</b> A complimentary collagen mask and relaxing facial massage.</li></ol>` }
  ],
  faq: [],
  gallery: [['salt-and-silk-facial-before-after', 'Before and after the Salt and Silk Facial showing a lifted, more defined jawline', 'Salt & Silk facial · before / after']],
  quotes: [],
  related: ['radiofrequency-skin-tightening', 'endospheres-therapy', 'cinderella-facelift']
});

T.push({
  slug: 'lumecca', cat: 'skin',
  name: 'Lumecca IPL Photofacial', short: 'Lumecca photofacial',
  title: 'Lumecca IPL Photofacial for Sun Spots & Redness, Thornhill',
  desc: 'Lumecca IPL photofacial in Thornhill clears sun spots, age spots, redness and small veins in 1–3 sessions. Face, neck, chest, hands, arms and legs.',
  img: 'lumecca-photofacial-clear-skin', imgAlt: 'A woman with clear, even-toned skin touching the corner of her eye',
  card: 'Intense pulsed light for sun spots, age spots, redness and tiny veins in 1–3 sessions.',
  lede: 'Lumecca by InMode is an intense pulsed light (IPL) photofacial that targets brown pigment and small red vessels. Most clients see brighter, clearer skin after the first session, and complete photorejuvenation often takes just one to three.',
  facts: [['Sessions', 'Usually 1–3'], ['Visible results', '1–2 weeks'], ['Redness', 'Usually gone within an hour'], ['Areas', 'Face, neck, chest, hands, arms, legs']],
  sections: [
    { h: 'What Lumecca treats', html: `<ul class="ticks cols"><li>Age spots (brown and red pigment)</li><li>Sun damage</li><li>Freckles</li><li>Rosacea redness</li><li>Spider veins and small vessels</li><li>Uneven texture</li></ul>
      <p>Lumecca puts about 40% of its energy into the 500–600 nm range, the sweet spot for both pigment and blood, compared with 10–15% for standard IPL. That is why it often needs one or two treatments where older devices needed four to six. A sapphire cooling tip keeps it comfortable.</p>` },
    { h: 'During and after', html: `<p>You will see a bright flash and feel something like a light elastic snap. Redness and warmth afterwards are normal and usually fade within an hour. Over the next 24–48 hours brown spots darken, then flake off during the following week, leaving a more even tone. Treated small veins may blanch and disappear, or change colour and fade over a few days.</p>` },
    { h: 'Before your session', html: `<p>Avoid direct, heavy sun and tanning for one month before treatment, and protect your skin from the sun afterwards while it is more sensitive.</p>` }
  ],
  faq: [
    ['How many Lumecca sessions will I need?', 'Most people need one to three. Improvement shows after the first; more sessions give a better final result, depending on your skin type and how much damage there is.'],
    ['When will I see results?', 'Sun damage and tone improve within days of the first session, with the most visible change at one to two weeks. Vein results show within about two weeks.'],
    ['Are there side effects?', 'Most people have none beyond brief redness. Skin can be more sun-sensitive just after treatment, so avoid direct sun and tanning.']
  ],
  gallery: [['lumecca-pigmentation-before-after', 'Split face showing sun-damaged skin with brown spots on one side and clear skin on the other', 'Pigmentation · before / after']],
  quotes: [['I would definitely recommend Lumecca. I like how it brightened my face and gave me a beautiful glow. I can really see a difference.', 'Lumecca client']],
  related: ['radiofrequency-skin-tightening', 'organic-peel', 'sclerotherapy']
});

T.push({
  slug: 'radiofrequency-skin-tightening', cat: 'skin',
  name: 'Forma RF Skin Tightening', short: 'Forma skin tightening',
  title: 'Forma Radio Frequency Skin Tightening in Thornhill',
  desc: 'Forma by InMode in Thornhill: radio frequency skin tightening for the jawline, smile lines, brows and neck. Essentially painless, no downtime. Book today.',
  img: 'handheld-device-facial', imgAlt: 'A gloved practitioner gliding a handheld treatment device across a relaxed client’s forehead',
  card: 'Radio frequency that tightens the jawline, brow and neck with no downtime.',
  lede: 'Forma by InMode uses radio frequency (RF) heat deep in the skin to trigger the body’s own collagen production, counteracting time and gravity. It tightens and sculpts without needles or surgery, and you can go straight back to your day.',
  facts: [['Course', 'Weekly for about 6 weeks'], ['Downtime', 'None'], ['Comfort', 'Essentially painless'], ['Areas', 'Face, neck and body']],
  sections: [
    { h: 'What Forma can do', html: `<p>Instead of turning to fillers or a facelift, Forma combines radio frequency and heat to:</p>
      <ul class="ticks cols"><li>Tighten the jawline and jowls</li><li>Soften nasolabial folds</li><li>Lift the brow area</li><li>Sculpt cheekbones</li><li>Smooth the forehead and crow’s feet</li><li>Firm the upper and lower eyelids</li><li>Tighten the neck</li><li>Firm arms (“bat wings”) and abdomen</li></ul>
      <p>It suits all skin types. Clients say their skin feels smoother and more defined, with fewer wrinkles. RF on its own is best for mild to moderate sagging.</p>` },
    { h: 'Your treatment plan', html: `<p>Sessions are usually weekly over about six weeks (five to six in total). Mild laxity may need fewer, spaced further apart; your schedule is set after a medical assessment. Slight redness afterwards is common and fades within a few hours.</p>
      <p>Forma combines well with facials, injectables and filler. One client’s favourite pairing was a hydro facial with Forma.</p>` }
  ],
  faq: [
    ['Does Forma hurt?', 'It is essentially painless and needs no downtime. Mild redness fades within a few hours.'],
    ['How many Forma sessions do I need?', 'Typically weekly sessions over six weeks. Mild laxity may need fewer, spaced further apart.'],
    ['Can Forma be combined with other treatments?', 'Yes, with most facials, injectables and fillers. Rebecca will advise on timing.']
  ],
  gallery: [
    ['forma-before-after-1', 'Before and after a course of Forma on the lower face and jawline', 'Forma · before / after'],
    ['forma-before-after-2', 'Before and after Forma, side view of the jaw and neck', 'Forma · before / after'],
    ['forma-before-after-3', 'Before and after Forma showing a firmer jawline', 'Forma · before / after'],
    ['forma-before-after-4', 'Before and after Forma skin tightening on the face', 'Forma · before / after']
  ],
  quotes: [['My Forma treatments improved my overall complexion without any pain or downtime. It is a great alternative to expensive procedures. I love the way my new face looks.', 'Jane'], ['Relax and become beautiful. I could see the result after the 2nd treatment.', 'Rena']],
  related: ['salt-and-silk-facial', 'lumecca', 'body-fx']
});

/* ───────────── BODY ───────────── */
T.push({
  slug: 'sclerotherapy', cat: 'body',
  name: 'Sclerotherapy (Spider Veins)', short: 'Sclerotherapy',
  title: 'Sclerotherapy Spider Vein Treatment in Thornhill',
  desc: 'Sclerotherapy for spider and reticular leg veins in Thornhill by a nurse who trains doctors in it. About 60 minutes, little pain. Call 416-728-5697.',
  img: 'sclerotherapy-smooth-legs', imgAlt: 'A woman’s smooth, bare legs crossed on a white background',
  card: 'Clears spider and small leg veins. Compression stockings fitted in-clinic.',
  lede: 'Sclerotherapy clears spider veins and small (reticular) leg veins with micro-injections. A sclerosing solution is placed in the vein through a very fine needle; it irritates the lining so the vein closes, scars down and fades away. Many veins can be treated in one visit.',
  facts: [['Session', 'About 60 minutes'], ['Typical course', '3–5 sessions (2–3 if mild)'], ['Anesthesia', 'Usually not needed'], ['Bruising fades', '10–14 days']],
  sections: [
    { h: 'Why come to Rebecca for veins', html: `<p>Rebecca has taught sclerotherapy to doctors and registered nurses for more than ten years. Spider veins are the treatment her Google reviewers mention most. One client, after years of hiding her legs, wrote that she can’t believe she will wear dresses again.</p>` },
    { h: 'What happens', html: `<ol class="steps"><li>Wear loose clothing. The veins to treat are identified.</li><li>Each vein is injected with a very fine needle. You’ll feel a small sting that burns for a few seconds; most people find it far less painful than expected. Numbing cream is available if you need it.</li><li>Your compression stockings go on afterwards.</li></ol>
      <p>Sometimes a few sessions two weeks apart are needed. Winter is the ideal season, as stockings are easy to wear under clothes.</p>` },
    { h: 'Compression stockings: the step that makes it work', html: `<p>Wearing thigh-high compression stockings is essential. They keep the walls of the treated vein pressed together so the body can break it down, speed healing, reduce the chance of pigmentation, and help protect against clotting by keeping blood moving. Without them, veins refill with blood and treatment is much less effective.</p>
      <ul class="ticks"><li>Wear them for 24 hours on the first day, then for one week.</li><li>The clinic professionally measures every client.</li><li>A full line is available in-clinic: socks, pantyhose and thigh-highs in cotton, sheer and ultra-sheer, in many colours.</li><li>Many employer benefit plans cover compression stockings; check with your insurer.</li></ul>` },
    { h: 'After treatment', html: `<ul class="ticks"><li>Walking soon after is encouraged. Avoid high-intensity sport for 5–7 days.</li><li>Treated areas may look bruised or swollen for a few days; bruising usually clears in 10–14 days.</li><li>Mild soreness is eased with Tylenol and by wearing your stockings.</li><li>You will walk normally.</li></ul>` },
    { h: 'Who should not have sclerotherapy', html: `<p>Almost anyone with unwanted spider veins can be treated, except during pregnancy or breastfeeding. It may not be suitable with a skin infection, uncontrolled diabetes, fever, a history of deep vein thrombosis, corticosteroid use, or anticoagulant therapy; anyone on a blood thinner is not a candidate. Stop aspirin and ibuprofen (Advil, Motrin) a few days before. No other preparation is needed.</p>` }
  ],
  faq: [
    ['How many sclerotherapy treatments will I need?', 'Typically three to five; milder cases often need two or three. More or larger veins need more sessions.'],
    ['Does sclerotherapy hurt?', 'Each injection gives a small sting that lasts a few seconds. Most people don’t need anesthesia and find it much easier than they expected.'],
    ['Can it treat large varicose veins?', 'Sclerotherapy is for small and medium veins near the surface. Large varicose veins need much more solution and a stronger formula, and are better assessed separately.'],
    ['Can veins on the face or hands be treated?', 'No. Sclerotherapy should never be used on the hands, and facial veins respond better to light-based treatment such as Lumecca.'],
    ['What do I need to do after?', 'Wear compression stockings (24 hours the first day, then for a week), walk as normal, and skip intense sport for 5–7 days.']
  ],
  gallery: [['compression-stockings', 'A range of compression stockings: knee socks, thigh-highs and pantyhose', 'Compression stockings, fitted in-clinic']],
  quotes: [['I had my spider veins removed by Victoria. She did an amazing job! She is very skilled and attentive.', 'Stella I.'], ['I can’t wait to wear shorts in the summer now that Victoria has cleared all my spider veins.', 'Kathryn K.']],
  related: ['lumecca', 'body-fx', 'endospheres-therapy']
});

T.push({
  slug: 'body-fx', cat: 'body',
  name: 'Body FX Body Contouring', short: 'Body FX',
  title: 'BodyFX Non-Surgical Body Contouring in Thornhill',
  desc: 'InMode BodyFX in Thornhill: radio frequency and vacuum to reduce fat and cellulite and tighten skin. No downtime, ~30 minutes per area. Ask for a quote.',
  img: 'body-contouring-silhouette', imgAlt: 'The smooth curve of a woman’s waist and hip with a butterfly resting on it',
  card: 'Radio frequency and vacuum for stubborn fat and cellulite. Zero downtime.',
  lede: 'BodyFX by InMode is non-invasive body contouring that targets fat and cellulite while tightening the skin over them. It combines radio frequency energy with gentle vacuum, constantly monitors skin temperature for safety, and feels like a warm, deep massage.',
  facts: [['Per area', '10 minutes (6 × 6 in)'], ['Visit', 'About 30 minutes for one area'], ['Course', '6–12 sessions, ~1 week apart'], ['Downtime', 'None']],
  sections: [
    { h: 'How it works', html: `<p>BodyFX treats larger areas such as the abdomen, back, love handles, hips and thighs. Radio frequency heats the fat under the skin while negative pressure (vacuum) draws the tissue up. The device tracks skin temperature and resistance continuously and cuts off automatically to hold the ideal temperature, which keeps the risk of burns extremely low.</p>
      <p>It is a non-surgical option for people who want to avoid liposuction, and can also be used alongside it.</p>` },
    { h: 'Your appointment', html: `<ol class="steps"><li>Talk through your concerns and expected results with your provider.</li><li>Before photos are taken to track your progress (for clinic use only unless you agree otherwise).</li><li>Change into a gown if needed. Each 6 × 6 inch area takes 10 minutes.</li><li>Get dressed and carry on with your day: there is no downtime.</li></ol>
      <p>Drink plenty of water before and after. Treatment isn’t done over open wounds, bruises or sunburn.</p>` },
    { h: 'Results', html: `<p>Fat and cellulite reduction can show after the first treatment, with skin feeling smoother and softer within a few sessions. Skin tightening takes longer, and the final result peaks at around six months. Treated fat cells don’t come back, but the body can still store new fat, so results last with a healthy diet and exercise.</p>` }
  ],
  faq: [
    ['Is BodyFX painful?', 'No. Most people find it relaxing: a warm sensation and a gentle pulling, like a deep-tissue massage.'],
    ['How long does a BodyFX session take?', 'Each 6 × 6 inch area takes 10 minutes. For one area you are in and out in about 30 minutes.'],
    ['How many sessions do I need?', 'Usually 6 to 12, about one week apart, until you reach the result you want.'],
    ['Is there any recovery?', 'None. Some redness and warmth last a few hours and won’t stop your normal activities.'],
    ['How much does BodyFX cost?', 'It depends on the size of the area and number of sessions. Call or email for a personal quote before you book, and ask about current promotions.']
  ],
  gallery: [
    ['bodyfx-before-after-abdomen', 'Before and after BodyFX on the abdomen and waist, side view', 'BodyFX · before / after'],
    ['bodyfx-before-after-thighs', 'Before and after BodyFX on the back of the thighs showing reduced cellulite', 'BodyFX · before / after']
  ],
  quotes: [],
  related: ['endospheres-therapy', 'radiofrequency-skin-tightening', 'sclerotherapy']
});

T.push({
  slug: 'endospheres-therapy', cat: 'body',
  name: 'Endospheres Therapy', short: 'Endospheres',
  title: 'Endospheres Therapy for Body & Face in Thornhill',
  desc: 'Endospheres therapy in Thornhill: Italian compressive microvibration for cellulite, fluid retention, muscle tension and facial contouring. Relaxing and non-invasive.',
  img: 'endospheres-body-legs', imgAlt: 'A therapist gliding the Endospheres roller along a client’s thigh',
  card: 'Italian microvibration for cellulite, puffiness, tension and a lifted face.',
  lede: 'Endospheres is an Italian technology that uses compressive microvibration: a roller of 55 silicone spheres sends low-frequency vibrations deep into the tissue. It boosts blood and lymph circulation and tones muscle, helping with cellulite, fluid retention, muscle tension and loss of facial definition, and it is genuinely relaxing.',
  facts: [['Technology', 'Compressive microvibration'], ['Device', '55 silicone spheres'], ['Areas', 'Body and face'], ['Feel', 'Relaxing, non-invasive']],
  sections: [
    { h: 'Five actions in one treatment', html: `<div class="rules five">
      <div><b>01</b><h3>Analgesic</h3><p>Stimulates the skin’s receptors to ease discomfort.</p></div>
      <div><b>02</b><h3>Draining</h3><p>The rotating cylinder activates lymphatic drainage, so you feel lighter and less puffy.</p></div>
      <div><b>03</b><h3>Vascular</h3><p>“Vascular gymnastics” improve microcirculation for a more even look.</p></div>
      <div><b>04</b><h3>Remodelling</h3><p>Compressing the tissue restores elasticity and definition.</p></div>
      <div><b>05</b><h3>Muscular</h3><p>Vibration makes muscles contract, toning and reshaping them.</p></div></div>` },
    { h: 'Endospheres body', id: 'body', html: `<p>Massage rollers and gentle vacuum improve circulation and drainage, so skin becomes smoother and firmer and cellulite less visible.</p>
      <ul class="ticks"><li>Tightens loose skin</li><li>Reduces cellulite, even at an advanced stage when the orange-peel look shows without pinching</li><li>Drains lactic acid and relieves muscle spasms, which makes it great after exercise</li><li>Stimulates collagen and elastin</li><li>Helps reshape the figure after giving birth</li></ul>` },
    { h: 'Endospheres face', id: 'face', html: `<ul class="ticks cols"><li>Stimulates collagen and elastin</li><li>Tightens and tones loose skin</li><li>Smooths wrinkles</li><li>Sculpts cheekbones</li><li>Firms the face contour</li><li>Reduces a double chin</li><li>Softens nasolabial folds</li><li>Reduces under-eye puffiness</li><li>Relieves facial muscle tension</li><li>Gives a light peel effect</li><li>Improves circulation</li><li>Strengthens small blood vessels</li></ul>` }
  ],
  faq: [['Is Endospheres painful?', 'No. It is non-invasive and most clients find it relaxing, like a deep rhythmic massage.'], ['Is it for men too?', 'Yes. Endospheres is used on both women and men, for the body and the face.']],
  gallery: [
    ['endospheres-roller-spheres', 'Close-up of the Endospheres handpiece showing its silicone spheres', 'The 55-sphere roller'],
    ['endospheres-face-treatment', 'A woman receiving an Endospheres facial treatment along the jaw', 'Endospheres face'],
    ['endospheres-body-shoulders', 'A man receiving Endospheres therapy on his upper back and shoulders', 'Endospheres body'],
    ['endospheres-hands', 'The Endospheres handpiece being used on a client’s hand and forearm', 'Endospheres on the arms']
  ],
  quotes: [],
  related: ['body-fx', 'salt-and-silk-facial', 'radiofrequency-skin-tightening']
});

/* ───────────── HAIR ───────────── */
T.push({
  slug: 'hair-loss-and-thinning-treatment', cat: 'hair',
  name: 'Hair Loss & Thinning Treatment', short: 'Hair loss treatment',
  title: 'PRP & Mesotherapy Hair Loss Treatment in Thornhill',
  desc: 'Hair thinning and hair loss treatment in Thornhill: the clinic’s own PRP plus mesotherapy protocol with multivitamins and minoxidil. Results in 2–3 months.',
  img: 'hair-loss-treatment-healthy-hair', imgAlt: 'A woman with long, thick, glossy hair',
  card: 'The clinic’s own PRP + mesotherapy protocol. First results in 2–3 months.',
  lede: 'Beauty Medical Clinic combines two treatments into one protocol for thinning hair: PRP injections to wake up the follicle, and mesotherapy with multivitamins and minoxidil to feed and protect it. Together they slow shedding and restart growth, and the first results usually show within two to three months.',
  facts: [['PRP', 'Monthly for 3–4 months'], ['Mesotherapy', 'Weekly for 4–6 weeks'], ['Maintenance', 'Every 3–6 months'], ['First results', '2–3 months']],
  sections: [
    { h: 'Why hair thins', html: `<p>Hair follicles are self-regenerating: stem cells in a part of the follicle called the bulge divide to grow new hair. With age, follicles shrink, the growth (anagen) phase shortens and the resting (telogen) phase lengthens, leaving thin, short hairs and empty follicles.</p>
      <p>In men this is male-pattern baldness (androgenic alopecia), driven by DHT, a by-product of testosterone. It affects the front and crown because that is where hormone-sensitive follicles live; the sides and back usually stay healthy. Women thin too, often as a widening part.</p>` },
    { h: 'Types of hair loss', html: `<ul class="defs"><li><b>Hereditary</b><span>The most common. Male- and female-pattern loss, gradual, and treatable in most cases.</span></li><li><b>Telogen effluvium</b><span>The second most common: diffuse shedding after a physical or emotional shock.</span></li><li><b>Alopecia areata</b><span>An autoimmune condition that can cause sudden round or patchy bald spots.</span></li><li><b>Traction alopecia</b><span>Caused by tight ponytails, braids, cornrows, rollers or hat bands. Reversible if the follicles aren’t permanently damaged.</span></li></ul>
      <p>Getting the type right is what decides the most effective treatment, so every plan starts with an assessment.</p>` },
    { h: 'Mesotherapy for hair', html: `<p>A very fine needle delivers vitamins, enzymes, peptides, minerals, hyaluronic acid, amino acids and minoxidil straight into the scalp. Together they improve circulation, help neutralize excess DHT at the follicle, reduce inflammation and stimulate collagen to slow loss, while the vitamins strengthen the hair you already have.</p>` },
    { h: 'PRP for hair', html: `<p>Platelets carry growth factors that speed healing. In the scalp they wake up dormant follicles and boost active ones, increasing blood supply and the thickness of each hair shaft. Hair grows back healthier and denser. <a href="../prp-rejuvenation/">More about PRP</a>.</p>` },
    { h: 'Who it works for', html: `<p>Anyone with hair loss can be a candidate, but early hair loss responds best. The combination is best suited to androgenic alopecia, the genetic thinning along the top of the head. Used together, PRP and mesotherapy can double the effect: shedding slows, new growth starts, and hair gains vitality, colour and shine, with less grey.</p>` },
    { h: 'The protocol', html: `<ol class="steps"><li><b>PRP</b> once a month for the first 3–4 months.</li><li><b>Mesotherapy</b> every week for 4–6 weeks.</li><li><b>Maintenance</b> every 3–6 months, depending on how your hair responds.</li></ol>
      <p>Consistency is key. Most people first notice they are losing less hair, then see more thickness and regrowth.</p>` }
  ],
  faq: [
    ['When will I see results from hair loss treatment?', 'Usually within two to three months of starting the protocol: first less shedding, then more thickness and regrowth.'],
    ['Does it work for women?', 'Yes. Female-pattern thinning, often a widening part with normal thickness at the back, responds well, especially when treated early.'],
    ['Is this treatment available elsewhere?', 'The combined PRP and mesotherapy protocol with multivitamins and minoxidil is the clinic’s own approach.']
  ],
  gallery: [
    ['hair-loss-before-after-1', 'Before and after hair treatment: a woman’s part looks visibly fuller after', 'Hair · before / after'],
    ['hair-loss-before-after-2', 'Before and after scalp photos showing regrowth at the crown', 'Hair · before / after'],
    ['hair-loss-before-after-3', 'Before and after scalp photos showing denser hair', 'Hair · before / after'],
    ['hair-mesotherapy-scalp-injection', 'A gloved practitioner giving mesotherapy micro-injections to a client’s scalp', 'Mesotherapy to the scalp']
  ],
  quotes: [],
  related: ['prp-rejuvenation', 'mesotherapy', 'microneedling']
});

const bySlug = Object.fromEntries(T.map(t => [t.slug, t]));

/* Old WordPress URLs that should forward to their new home. */
const REDIRECTS = {
  'home': '',
  'botox-dysport-faq': 'botox-dysport/#faq',
  'hyaluronic-acid-dermal-fillers': 'dermal-fillers/#faq',
  'hyaluronic-acid': 'dermal-fillers/',
  'dermalFillers-fillers': 'dermal-fillers/',
  'faq': 'prp-rejuvenation/#faq',
  'forma-faq': 'radiofrequency-skin-tightening/#faq',
  'radio-frequency-skin-tightening': 'radiofrequency-skin-tightening/',
  'bodyfx-faq': 'body-fx/#faq',
  'bodyfx': 'body-fx/',
  'lumeca': 'lumecca/',
  'lumecca-faq': 'lumecca/#faq',
  'micro-needling-pre-and-post-treatment-instructions': 'microneedling/#aftercare',
  'herbal-peel-pre-and-post-treatment-instructions': 'organic-peel/#aftercare',
  'hair-growth-revolutionary-treatment': 'hair-loss-and-thinning-treatment/',
  'news': 'cinderella-facelift/',
  'promotions': 'contact/',
  'lets-laugh': '',
  'face-treatment': 'services/',
  'maintenance': '',
  'hydrofacial': 'services/'
};

module.exports = { FACTS, CATEGORIES, REVIEWS, ZONES, T, bySlug, REDIRECTS };
