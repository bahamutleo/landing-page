/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Truck, Info, Star, CheckCircle2, Package } from "lucide-react";

export default function App() {
  const [mainImage, setMainImage] = useState("https://picsum.photos/seed/product-main/800/800");

  const productImages = [
    "https://picsum.photos/seed/product-main/800/800",
    "https://picsum.photos/seed/prd-img-1/800/800",
    "https://picsum.photos/seed/prd-img-2/800/800",
    "https://picsum.photos/seed/prd-img-3/800/800",
  ];
  const features = [
    { id: 1, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 2, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 3, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 4, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 5, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 6, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
  ];

  const ingredients = [
    { id: 1, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 2, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 3, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 4, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 5, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
    { id: 6, text: "Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions" },
  ];

  return (
    <div className="min-h-screen bg-[#BFDBFE] font-sans text-slate-900 pb-24">
      {/* Top Banner */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 text-center border-b border-blue-200">
        <p className="text-sm font-medium flex items-center justify-center gap-2">
          <Truck size={16} className="text-blue-600" />
          Shipping take 1-3 days
        </p>
      </div>

      {/* Hero Section / Product Images */}
      <section className="p-4 space-y-4">
        <div className="aspect-square bg-blue-100 rounded-2xl overflow-hidden border-2 border-blue-300 flex items-center justify-center relative shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img 
              key={mainImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={mainImage} 
              alt="Main Product" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none">
            <span className="text-blue-800/30 font-bold text-4xl uppercase tracking-widest">Product Images</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {productImages.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setMainImage(img)}
              className={`aspect-square rounded-xl border-2 overflow-hidden shadow-sm transition-all ${
                mainImage === img ? "border-blue-600 scale-105" : "border-blue-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${i}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Product Description */}
      <section className="p-6 bg-white/40 border-y border-blue-200">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Info size={20} className="text-blue-600" />
          Product Description
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Here Are Several Types Of Blind Text (Placeholder Text) Suitable For Product Descriptions, Ranging From Classic Lorem Ipsum To Thematic Variations, Along With Tips On How To Use Them Effectively.
        </p>
      </section>

      {/* Features */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-tight">Features</h2>
        <div className="space-y-6">
          {features.map((feature) => (
            <motion.div 
              key={feature.id}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="w-20 h-20 bg-white rounded-lg border border-blue-200 flex-shrink-0 shadow-sm overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/feature-${feature.id}/200/200`} 
                  alt="Feature" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm text-slate-700 pt-1">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ingredient Section */}
      <section className="p-6 bg-white/60">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-tight">Ingredient</h2>
        <div className="mb-8 aspect-[3/4] bg-white rounded-2xl border border-blue-200 shadow-inner overflow-hidden">
          <img 
            src="https://picsum.photos/seed/ingredients-main/600/800" 
            alt="Ingredients Main" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-6">
          {ingredients.map((item) => (
            <motion.div 
              key={item.id}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 20 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="w-20 h-20 bg-white rounded-lg border border-blue-200 flex-shrink-0 shadow-sm overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/ingredient-${item.id}/200/200`} 
                  alt="Ingredient" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm text-slate-700 pt-1">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Star className="fill-yellow-400 text-yellow-400" />
          Testimonial
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-64 aspect-[9/16] bg-white rounded-2xl border border-blue-200 shadow-md snap-center overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/testimonial-${i}/400/700`} 
                alt="Testimonial Chat" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Shipping Detail */}
      <section className="p-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-tight">Shipping Detail</h2>
        <div className="aspect-[16/9] bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
          <img 
            src="https://picsum.photos/seed/shipping-map/800/450" 
            alt="Shipping Map" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute flex flex-col items-center text-slate-400">
            <Package size={48} />
            <span className="font-bold text-2xl">IMG</span>
          </div>
        </div>
      </section>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 p-4 flex items-center gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <button className="flex-1 bg-[#4ADE80] hover:bg-[#22C55E] text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95">
          <MessageCircle size={24} />
          Whatsapp
        </button>
        <div className="bg-blue-100 px-6 py-4 rounded-xl border border-blue-200">
          <span className="text-xl font-black text-blue-900">RM168</span>
        </div>
      </div>
    </div>
  );
}
