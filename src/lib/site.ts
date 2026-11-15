import learnersSmiling from "@/assets/photos/learners_smiling.jpg.asset.json";
import cookingClass from "@/assets/photos/cooking_class.jpg.asset.json";
import friendsOnLawn from "@/assets/photos/friends_on_lawn.jpg.asset.json";
import swingGarden from "@/assets/photos/swing_garden.jpg.asset.json";
import swingFriends from "@/assets/photos/swing_friends.jpg.asset.json";
import schoolTrip from "@/assets/photos/school_trip.jpg.asset.json";

/** Swap any school photo here — every page reads from this list. */
export const photos = {
  learnersSmiling: learnersSmiling.url,
  cookingClass: cookingClass.url,
  friendsOnLawn: friendsOnLawn.url,
  swingGarden: swingGarden.url,
  swingFriends: swingFriends.url,
  schoolTrip: schoolTrip.url,
};

export const school = {
  name: "Kilifi Angels Junior School",
  shortName: "Kilifi Angels",
  motto: "Nurtured in Faith, Growing in Excellence",
  location: "Kilifi, Kilifi County, Kenya",
  email: "info@kilifiangels.ac.ke",
  hours: "Mon – Fri: 7:00 am – 5:00 pm · Sat: 8:00 am – 12:00 pm",
  verse: {
    text: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
    ref: "Proverbs 22:6",
  },
};

export const leaders = [
  {
    name: "Esther Macharia",
    role: "School Director",
    phone: "0721896215",
    message:
      "At Kilifi Angels we believe every child is a gift from God. Our calling is to walk with each learner, nurturing their faith, character and talents so they grow into confident, caring and capable young people.",
  },
  {
    name: "Eunice Macharia",
    role: "Headteacher",
    phone: "0700263844",
    message:
      "Our classrooms are places of curiosity, kindness and hard work. Through the CBC we help every learner discover their strengths, and we partner closely with parents to celebrate each step of growth.",
  },
];

export function telHref(phone: string) {
  return `tel:+254${phone.replace(/^0/, "")}`;
}
export function whatsappHref(phone: string) {
  return `https://wa.me/254${phone.replace(/^0/, "")}`;
}

export type NavItem = { label: string; to: string };

export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Admissions", to: "/admissions" },
];

export const schoolLifeNav: NavItem[] = [
  { label: "Leadership", to: "/leadership" },
  { label: "Christian Life", to: "/christian-life" },
  { label: "Co-curricular", to: "/co-curricular" },
  { label: "Facilities", to: "/facilities" },
  { label: "Gallery", to: "/gallery" },
  { label: "Downloads", to: "/downloads" },
];

export const trailingNav: NavItem[] = [
  { label: "News & Events", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export const values = [
  { title: "Faith", text: "Christ at the centre of everything we do." },
  { title: "Love", text: "Every child is known, valued and cared for." },
  { title: "Integrity", text: "Honesty and responsibility in word and deed." },
  { title: "Excellence", text: "Giving our very best in learning and service." },
  { title: "Respect", text: "Honouring God, one another and our community." },
];

export const events = [
  { date: "2026-11-27", title: "End of Year Prize Giving Day", place: "School grounds" },
  { date: "2026-12-04", title: "Christmas Carol Service", place: "School chapel" },
  { date: "2027-01-05", title: "Term 1 opens", place: "All grades" },
  { date: "2027-01-23", title: "Parents' Open Day", place: "Classrooms" },
];

export const news = [
  {
    slug: "home-science-practical",
    date: "2026-10-30",
    title: "Junior School learners shine in cooking practicals",
    excerpt:
      "Grade 7 and 8 learners prepared a full traditional meal, putting their Agriculture and Nutrition lessons into practice.",
    image: "cookingClass" as const,
  },
  {
    slug: "nature-walk",
    date: "2026-09-27",
    title: "Learning beyond the classroom on our field trip",
    excerpt:
      "Learners explored a local nature reserve, journaling plants and animals for their Environmental and Science projects.",
    image: "schoolTrip" as const,
  },
  {
    slug: "games-afternoon",
    date: "2026-09-26",
    title: "Friendship and fun at Games Afternoon",
    excerpt:
      "Our weekly games slot brought every grade outdoors for football, skipping, swings and a lot of laughter.",
    image: "friendsOnLawn" as const,
  },
];

export const termDates = [
  { term: "Term 1 · 2027", opens: "Mon 5 Jan", halfTerm: "26 – 28 Feb", closes: "Fri 2 Apr" },
  { term: "Term 2 · 2027", opens: "Mon 26 Apr", halfTerm: "25 – 27 Jun", closes: "Fri 30 Jul" },
  { term: "Term 3 · 2027", opens: "Mon 23 Aug", halfTerm: "—", closes: "Fri 29 Oct" },
];

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-KE", opts);
}
