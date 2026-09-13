export interface SocialLink {
  id?: string;
  icon: string;
  url: string;
}

export interface NavLink {
  id: string;
  label: string;
  url: string;
}

export interface LanguageOption {
  id: string;
  code: string;
  name: string;
}

export interface HeaderContent {
  logoUrl: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  locationLink: string;
  socialLinks: SocialLink[];
  navLinks: NavLink[];
  languages: LanguageOption[];
  regionName: string;
  regionFlagUrl: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}

export interface HeroSlide {
  id: string;
  subtitle: string;
  title: string;
  text: string;
  bgImage: string;
  btnText: string;
  btnLink: string;
}

export interface CounterItem {
  id: string;
  number: number;
  suffix: string;
  label: string;
}

export interface HomeAboutContent {
  subtitle: string;
  title: string;
  desc1: string;
  desc2: string;
  experienceYears: number;
  experienceLabel: string;
  checklist: string[];
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  mainImage: string;
}

export interface HomeServiceItem {
  id: string;
  num: string;
  title: string;
  icon: string;
  thumb: string;
  desc: string;
}

export interface HomeWhyChooseItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface HomeProcessStep {
  id: string;
  number: string;
  title: string;
  desc: string;
}

export interface HomePortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface HomeTestimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface CtaContent {
  subtitle: string;
  title1: string;
  title2: string;
  bgImage: string;
  btnText: string;
  btnLink: string;
}

export interface BreadcrumbContent {
  title: string;
  pageName: string;
  bgImage: string;
}

export interface AboutPageContent {
  breadcrumb: BreadcrumbContent;
  subtitle: string;
  title: string;
  desc1: string;
  desc2: string;
  experienceYears: number;
  experienceLabel: string;
  checklist: string[];
  mainImage: string;
  whyChooseSubtitle: string;
  whyChooseTitle: string;
  whyChooseCards: { id: string; title: string; desc: string; icon: string }[];
  processSubtitle: string;
  processTitle: string;
  processSteps: { id: string; number: string; title: string; desc: string }[];
}

export interface ServiceCardItem {
  id: string;
  num: string;
  title: string;
  icon: string;
  items: string[];
}

export interface BenefitItem {
  id: string;
  number: string;
  title: string;
  desc: string;
}

export interface ServicesPageContent {
  breadcrumb: BreadcrumbContent;
  subtitle: string;
  title: string;
  description: string;
  services: ServiceCardItem[];
  benefitsSubtitle: string;
  benefitsTitle: string;
  benefitsThumb: string;
  benefitsList: BenefitItem[];
}

export interface ServiceSubsection {
  name: string;
  detail: string;
}

export interface ServiceDetailArticle {
  id: string;
  num: string;
  tabTitle: string;
  serviceTitle: string;
  thumb: string;
  desc: string;
  subsections: ServiceSubsection[];
}

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  image: string;
}

export interface ProjectsPageContent {
  breadcrumb: BreadcrumbContent;
  projects: ProjectItem[];
}

export interface ProjectDetailsContent {
  breadcrumb: BreadcrumbContent;
  mainImage: string;
  projectInfo: {
    client: string;
    category: string;
    location: string;
    date: string;
    status: string;
    budget: string;
  };
  specs: { id: string; label: string; value: string }[];
  overviewTitle: string;
  overviewText: string;
  featureHighlights: { id: string; title: string; desc: string; icon: string }[];
  challengesTitle: string;
  challengesText: string;
}

export interface OfficeLocation {
  id: string;
  title: string;
  phone: string;
  email: string;
  hours: string;
  thumb: string;
}

export interface ContactPageContent {
  breadcrumb: BreadcrumbContent;
  offices: OfficeLocation[];
  formSubtitle: string;
  formTitle: string;
  formDesc: string;
  submitButtonText: string;
  mapEmbedUrl: string;
}

export interface FooterContent {
  aboutText: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  copyrightText: string;
  quickLinks: { id: string; label: string; url: string }[];
}

export interface SiteContent {
  header: HeaderContent;
  homeHero: HeroSlide[];
  homeCounter: CounterItem[];
  homeAbout: HomeAboutContent;
  homeServices: HomeServiceItem[];
  homeWhyChoose: HomeWhyChooseItem[];
  homeProcess: HomeProcessStep[];
  homePortfolio: HomePortfolioItem[];
  homeTestimonials: HomeTestimonial[];
  ctaFour: CtaContent;
  aboutPage: AboutPageContent;
  servicesPage: ServicesPageContent;
  serviceDetailsList: ServiceDetailArticle[];
  projectsPage: ProjectsPageContent;
  projectDetails: ProjectDetailsContent;
  contactPage: ContactPageContent;
  footer: FooterContent;
}
