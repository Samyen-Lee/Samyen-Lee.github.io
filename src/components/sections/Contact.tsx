"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { profile } from "@/data/profile";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const contactItems = [
  {
    icon: HiMail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: HiPhone,
    label: "Téléphone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    icon: HiLocationMarker,
    label: "Localisation",
    value: profile.location,
    href: null,
  },
];

const socialLinks = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: profile.github,
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: profile.linkedin,
  },
];

const currentYear = new Date().getFullYear();

export default memo(function Contact() {
  return (
    <div className="h-full overflow-y-auto flex flex-col items-center px-4 md:px-6 max-w-4xl mx-auto w-full py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 md:mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-3">
          Contact
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          N&apos;hésitez pas à me contacter pour discuter de vos projets
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full">
        <div className="space-y-3">
          {contactItems.map((item, i) => (
            <GlassCard key={item.label} delay={i * 0.1} hover={!!item.href} className="py-4">
              {item.href ? (
                <a
                  href={item.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <item.icon className="text-blue-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">{item.label}</p>
                    <p className="text-zinc-200 font-medium text-sm">{item.value}</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <item.icon className="text-blue-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">{item.label}</p>
                    <p className="text-zinc-200 font-medium text-sm">{item.value}</p>
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        <GlassCard delay={0.3} hover={false}>
          <h3 className="text-lg font-semibold text-white mb-3">
            Travaillons ensemble
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-5">
            Disponible pour des missions de développement fullstack, des
            projets d&apos;IA ou des collaborations techniques. Je suis
            particulièrement intéressé par les projets innovants combinant
            développement web moderne et intelligence artificielle.
          </p>

          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-zinc-400 hover:text-blue-400 hover:border-blue-500/30 transition-colors"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </motion.a>
            ))}
          </div>
        </GlassCard>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-4 md:mt-8"
      >
        <p className="text-zinc-600 text-xs">
          &copy;{' '}{currentYear}{' '}Samyen Lee Andriatiana. Construit avec Next.js, Three.js &amp; Framer Motion.
        </p>
      </motion.div>
    </div>
  );
});
