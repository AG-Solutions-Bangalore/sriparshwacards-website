export interface CollectionCategory {
  id: string;
  title: string;
  image: string;
  alt: string;
}

export interface ProductItem {
  id: string;
  title: string;
  badge: string;
  price: string;
  type: "Christian" | "Hindu" | "Muslim" | "General";
  occasion: string;
  tier: "Budget" | "Standard" | "Premium" | "Luxury" | "Exclusive";
  image: string;
  alt: string;
}

export const CATEGORIES_DATA: CollectionCategory[] = [
  {
    id: "christian",
    title: "Christian",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCchUUyicYFaA-wcH0KUzpifu_IXAZ1riWXtpKw2t8jYPhtzZoc6PC0p2TjQDu1rr2OMu8o28eaoq0X9JrTGaMxQVcR9MLQyBzPzAHWZkfElTxRLZpaaz98QwPLOHxeDQkJfLqzC1GvKEvGJVBcTDw07KXZiflokrLnmJhnSmta1SMZHsciMzqiAIoHcj90yo_25kYqA8mDtCz74wM1Xr44_1SqCmdDGIy9hoA_EEbBqlmadX4Ceh55",
    alt: "Christian wedding invitation on thick cotton paper",
  },
  {
    id: "hindu",
    title: "Hindu",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_fxjG2TdkZ2hkm84oWLMfEuWs1t5-V3Y0W4x9M7DdU-CSKFbR_iYZ4RN1z-hE2FKA1yDOb1iE1pOJ4pGv0nWCbICAFdeN8aJvBM3NJPBfGM4ojXFC_7zlnRj-CKJbzW5G6R0gvMBQs8nbwAVK3SwWYPUTRYOAhWZOqxHNoEH3wqMDnEmW-Iepb03Xq8eM9bnd12jagA6gFYtRXPIoHU_ygRabSPsAxJe9IYVfTLAfIn88MuS3CIg5",
    alt: "Hindu wedding invitation with gold foil mandala motif",
  },
  {
    id: "muslim",
    title: "Muslim",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAB-9Ca5g6UUXrZNggVt5aIIMXAivQ-6rdJ6Ve3ecLPU4hZDlG80swO-1aDqBSdbtZPaHCNo2lh13jt7U9ZOwYqDZS4FY0YymfOttIjHALCm72xGoXUH1ti-PP7cu6ifpnfSYJq3p-7rkRkgHKLUDXH5szVleSqpOeHtfyaqFIP0CRuIzh7AgTS36mD-Z5XdHpNIJKfLDCTCIX-S8EpsvM0mchRb_U-zafYpQBUW2BbtaNYP-16sg-x",
    alt: "Muslim wedding invitation with gold calligraphy on emerald green",
  },
  {
    id: "general",
    title: "General",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSkue-bb9lS4-ElmsztmzxLZTDv9s584GjT91fIjw4mfCZZWLnIhzj-Fv8PRmjc1xe-T8bEOyZRwtFGHjiQOjS5N6Au3cK51VgEmyUfHkB4xicKNXrA7KRUil2976-wVJDXVgz49pUpTy1R2tN17z1tyi39ZNSbMlcEJYp1Pz3Ktk_zgZCsoL2mdFJF5i-H4xBDEcyFN72clzFkutpeIgP5L5Tg9C7G323cJ3ZH0pqiT29s6WiKHRT",
    alt: "Non-denominational wedding invitation on textured taupe paper",
  },
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "p1",
    title: "The Aurelia Suite",
    badge: "Luxury • Handmade Paper",
    price: "₹850 / suite",
    type: "Christian",
    occasion: "Wedding",
    tier: "Luxury",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqLSpjjRXR4BMubrLaRShF046tTTuGU92rRensYkHsiNW7SAP4QKKLpqTS2aA3HHGX3aoyXhTSPOtMd5hUb86YcESvbSe2b73DOppNy2QffAnUwkY-vptHr-Wo994gta_RapgqUKO-vhExdpQ1drqA645CFcQO8U_nfYy-vDs7ColoYzNz4MYsUcbUOqt2jilVk42dm12U2L47ZPKc3pNSLPCMVfG8yus_npq5tbA5ewdbzeAGrsfX",
    alt: "Aurelia Suite letterpress card with gold wax seal",
  },
  {
    id: "p2",
    title: "The Provence Impression",
    badge: "Premium • Cotton Rag",
    price: "₹450 / suite",
    type: "Hindu",
    occasion: "Wedding",
    tier: "Premium",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZiR2STSFyhbk29hmTzPa5mJBrfRbiW491CX5LwdNzw8JTcynYxCsN-bPkqSlsJ2y06_cl4YmYucs-nkTNnBYoLYJwTXcZ1UfDfx0s6I2kOIhaN86US7fE662sTIMXGp5sMu-xnTObREpMFfZWxVKCofJakFKput9XAykNj9xLtU5KZf7JGkiLC3n6uVWIv_VtPjHu5Xueg9ZchP_vx4KmPZ4IwS-5r3xwTCoRIv5yDqxGmp5TUc2",
    alt: "Provence Impression deep floral embossing",
  },
  {
    id: "p3",
    title: "The Rose Gold Monogram",
    badge: "Exclusive • Foil Stamped",
    price: "₹1,200 / suite",
    type: "Muslim",
    occasion: "Engagement",
    tier: "Exclusive",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClZshjndsha12irNs066LvlFLKIfv0PLMQWjZihK3yJY8D1zagTmAKAr_fPiCtBZcs7zL96tdSZ_8NqHXeXoiSwsAhEkuOOnhm1sX8IHKfR2XtpEr3Hc7oSXuRMD_aj37UcPI7lSKURzFkKTDvfdPXCNLM7DWTvazMXSnVM4Lnoq5sjrhhr7lAP7FXeTXaoxqTMFaLwYA1arGVJnM0IJ061TnME28dj1RqySwUwXMcxik0ecVVtmUm",
    alt: "Rose Gold Monogram on soft blush textured card",
  },
  {
    id: "p4",
    title: "The Modernist Script",
    badge: "Standard • Smooth Ivory",
    price: "₹120 / suite",
    type: "General",
    occasion: "Wedding",
    tier: "Standard",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB03C2XC1bTq-L2n0R80OmBqVDrp92hqTen-MY8ng6tG5vgvdhKX-TPwuQGEeFHGzUEHCqbJXc8KEKXR8IspUjGPl2jGm7ca99EVSs4nRlMW8iWZ3W5KVJ4TKMlAgY55a_cxxNEoRYCUgfMO0iB91N0xjbhPo5QI3ARyz3oqJkwTdGqp7g2Iguj0sXX7k__MFgZnUZdoLtVWvd865j0F51NZWHNU8oC4WbzD3Vben-9ugD5rVyLq2wE",
    alt: "Modernist Script bold typography on smooth ivory",
  },
  {
    id: "p5",
    title: "Pichwai Srinivas Kalyanam",
    badge: "Premium • MDF Hardbound",
    price: "₹650 / suite",
    type: "Hindu",
    occasion: "Wedding",
    tier: "Premium",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVFZun0dWWErWQfESOq9ji2PZGhaJkIlksr3VXihl-dyOyfUhbVyYZyQ2mx-mNEjhUfRyjfdWS64Ue_ex9a77-82foqSDRPjyuvm-C-bl3GLzcyyvw4O_CdmTySQrIphk32ErhXQmvZ6MqjTPw5RuVRYiBdax756uefSGPQJ4Ebfx3tD7mmAYW3ykvLvBEwbZq4NR1wPFgb2QpW5RX_9NT-1nGOMo7HQkBEN9l0Lnld8QTiKkP_Bxs",
    alt: "Pichwai Srinivas Kalyanam MDF hardbound card",
  },
  {
    id: "p6",
    title: "Powder Blue Pastel Floral",
    badge: "Luxury • Gold Foil",
    price: "₹780 / suite",
    type: "Christian",
    occasion: "Engagement",
    tier: "Luxury",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpA-SP1AmBRuWCnnXJ872xN_QzRExsf0eyWQp4dPFhoSeDaPup74jOjFfR6Se0PRLVANQq0jRvBA4S4sYWOZkHo5pIqA1nxNhFMF7tzxhES1RyYXgkL41LZTOCI0ZTU_ygfPIkVRrSnm31wPzsGqOh99K1IoAwtt5OGE1TG28r5E8AVzeK2FlVQVxBKcAYMykriNb6K64M3ESi1VtL5V29eJd-SZKxtx8AcGxTWwXIDE8Shl_qY0WN",
    alt: "Powder Blue Pastel Floral with gold foil",
  },
];
