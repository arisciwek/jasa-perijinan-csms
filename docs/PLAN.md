# Project Implementation Plan: Konsultan CSMS Website

## 1. Project Overview
This plan outlines the implementation of the CSMS (Contractor Safety Management System) consulting website for konsultancsms.com. The site serves as a professional services platform for CSMS consulting, documentation, verification, and digitalization services targeting contractors in oil & gas, mining, manufacturing, construction, and petrochemical sectors.

**Key Distinction from PRD.md:** While PRD.md defines a generic Astro-based content framework with registry and workflow engine, this plan focuses on the specific content, structure, and business requirements of a CSMS consulting services website.

**Current Status: ~90% Complete** (as of Week 6, Phase 4 - Polish & Launch)
- Core features: ~90% implemented
- 34 pages generated, 33 sitemap routes
- 33 content block types
- 13 articles with structured blocks + mid-content CTAs
- Build: Passing | Deploy: Ready

## 2. Site Structure & Core Pages

### Primary Navigation
- Home
- CSMS Elements (9 elements)
- Services
- Artikel
- About Us
- Contact

### Detailed Page Structure

#### Homepage (`/`)
- Hero section with value proposition
- Quick stats: 100% CSMS passing rate, 100+ verified contractors, 0 complaints, 24/7 consultation
- Services overview (4 service types with icons)
- 9 CSMS elements preview
- Testimonial carousel
- Call-to-action for free consultation

#### CSMS Elements Page (`/csms-elements`)
- Overview of 9 required CSMS elements
- Individual element detail pages:
  1. Kepemimpinan & Komitmen
  2. Kebijaksanaan dan Sasaran Strategis  
  3. Organisasi, Tanggung Jawab
  4. Manajemen Resiko
  5. Perencanaan dan Prosedur
  6. Implementasi dan Pemantauan
  7. Audit dan Tinjauan Pelaksanaan K3LL
  8. Pencapaian Kinerja K3LL
  9. Pencapaian Lainnya
- Each element page: description, importance, typical deliverables, how we help

#### Services Page (`/services`)
- Four main service offerings:
  1. **Penyusunan Dokumen CSMS dari Nol** 
     - For companies without existing CSMS documentation
     - Process, timeline, deliverables
  2. **Review & Gap Analysis CSMS**
     - Evaluation of existing documentation
     - Identifying improvement areas
     - Enhancement recommendations
  3. **Pendampingan Verifikasi & Audit HSE**
     - Preparation for principal verification
     - Audit process guidance
     - Certification support
  4. **Digitalisasi & Standardisasi K3LL**
     - Physical to digital transformation
     - Standardized format implementation
     - Easy management & access

#### HSE Planning Integration
The website will emphasize how the consultant's services support comprehensive HSE (Health, Safety, and Environment) planning for contractors. This includes:
- Explanation of how CSMS documentation forms the foundation for effective HSE planning
- Details on how each of the 9 CSMS elements contributes to specific aspects of HSE planning
- Information about regulatory requirements for HSE plans in construction (such as CDM 2015 in the UK or equivalent Indonesian regulations)
- Examples of how the consultant's services help contractors develop, implement, and maintain HSE plans
- Case studies showing improved HSE performance through proper CSMS implementation

#### Additional Business Licensing Services
Beyond CSMS consulting, the website will also highlight complementary business licensing services that support contractors and other businesses in Indonesia:
- Pembuatan Akte Pendirian dan Akte Perubahan (including NPWP & NIB)
- Pengurusan Pemenuhan Sertifikat Standar di OSS (BPOM, Halal, CPOB, CPPOB, CDAKB, CPAKB, dll)
- Pengurusan Izin Perdagangan Ekspor & Impor
- Pengurusan Izin Pertambangan, Izin Migas
- Pengurusan Izin Transportasi
- Pengurusan Izin Alat Kesehatan
- Pengurusan SBU Konstruksi
- Dll.

#### Jasa Konsultan HKI (Hak Kekayaan Intelektual)
The consultant also provides intellectual property registration services:
- Merk/Brand/Logo
- Hak Cipta
- Paten
- dan lainnya untuk melindungi eksklusivitas identitas dan kekayaan intelektual Anda

#### About Us Page (`/about`)
- Company mission and vision
- Team expertise (HSE professionals)
- Industry experience and sectors served
- Office location and contact details
- Certifications and affiliations

#### Contact Page (`/contact`)
- Contact form (name, company, email, WhatsApp, service type, message)
- Office address with map
- WhatsApp click-to-chat buttons (+62 811 2676071, +62 81929012587)
- Business hours (Senin-Jumat: 08:00-17:00 WIB, Sabtu-Minggu: Tutup with 24/7 emergency service)
- Social media links

## 3. Content Strategy

### Content Sources
- Reference: konsultancsms.com (live site)
- Service descriptions from reference site
- 9 CSMS elements descriptions
- Testimonials from reference site
- Performance statistics
- Contact information

### Content Types
- **Static Pages**: Home, About, Services, Contact
- **Taxonomy Pages**: CSMS Elements (9 items)
- **Dynamic Components**: Testimonial carousel, stats counters, service cards
- **Forms**: Contact consultation form
- **Legal**: Privacy policy, copyright notice

### Content Requirements
- Bahasa Indonesia as primary language
- Professional, trustworthy tone
- Clear value proposition for each service
- Concrete benefits and outcomes
- Local contact information prominent
- Mobile-responsive design considerations
- **Gambar SVG per Halaman**: Setiap halaman (termasuk artikel dan elemen CSMS) memiliki gambar SVG unik dengan nama file deskriptif dan `alt` text yang relevan. Gambar disimpan di `/public/images/` dengan struktur folder per kategori (home/, services/, articles/, csms-elements/).

## 4. Technical Implementation Notes

### Design & UX Considerations
- Professional, corporate aesthetic
- Trust-building elements: testimonials, stats, certifications
- Clear conversion paths: contact form, WhatsApp buttons
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA)
- Fast loading times for business users
- **Gambar per Halaman (SVG)**: Setiap halaman memiliki gambar SVG yang di-generate secara programmatis dengan nama file sesuai konteks halaman (mis. `home-hero.svg`, `services-csms.svg`, `articles/audit-csms-migas.svg`). Gambar tidak menggunakan foto orang/kegiatan besar, melainkan ilustrasi vektor minimalis yang relevan dengan topik halaman. Setiap gambar memiliki `alt` text yang deskriptif dan kontekstual.

### Integration Points
- WhatsApp click-to-chat functionality
- Contact form processing (to be implemented)
- Google Maps embed for office location
- Social media sharing/links
- Analytics implementation (Google Analytics or similar)

### Multi-Environment Domain Strategy
- **Development**: Local `.lan` domain (`SITE_URL=http://jasa-perijinan-csms.lan`).
- **Staging/Preview**: Vercel `.app` preview deployments.
- **Production**: Custom domain (`https://www.perijinan-csms.com`).
- **Asset Handling**: UI assets (`<img>`, links) use relative paths for universal compatibility. SEO metadata (`og:image`, canonical) uses absolute URLs via `siteUrl(path, true)`.
- Local SEO for Jakarta area
- Industry-specific keywords: "Konsultan CSMS", "Jasa Pembuatan Dokumen CSMS", "Verifikasi CSMS"
- Service-specific long-tail keywords
- Schema markup for local business and professional services
- Optimized meta descriptions and titles

## 5. Implementation Phases

### Phase 1: Foundation & Core Pages (Week 1-2) ✅ **COMPLETED**
- Project setup with Astro + TypeScript ✅
- Global layout and navigation components ✅
- Homepage implementation ✅
- About and Contact pages ✅
- Basic styling and responsive foundation ✅
- Initial content population from reference site ✅

### Phase 2: Service & Content Depth (Week 3-4) ✅ **COMPLETED**
- Services page with detailed service descriptions ✅
- CSMS Elements overview page ✅
- Individual element detail pages (9 pages) ✅
- Enhanced styling and component library ✅
- Content refinement and validation ✅
- Internal linking structure ✅

### Phase 3: Conversion & Trust Elements (Week 5) ✅ **COMPLETED**
- Content blocks system (33 block types) ✅
- 13 articles with structured content blocks ✅
- Mid-content CTA insertion (service-cta) ✅
- Sticky sidebar with scrollable wrapper ✅
- Related articles component ✅
- Related service linking ✅
- Stats counter display ✅
- Trust elements: testimonials placeholder ✅

### Phase 4: Polish & Launch (Week 6) 🔄 **IN PROGRESS** (~90% done)
- SEO optimization ✅ (meta, structured data, sitemap)
- Multi-environment domain strategy ✅
- SVG assets programmatic per page ✅
- Sticky sidebar with scrollable wrapper ✅
- Article layout sticky sidebar fix ✅
- ⏳ Contact form processing (UI only, backend pending)
- ⏳ Google Maps embed
- ⏳ Contact form processing backend
- ⏳ Analytics (GA) setup
- ⏳ Contact form validation (client-side)
- ⏳ Performance validation (<3s load time)
- ⏳ Accessibility audit (WCAG 2.1 AA formal)
- ⏳ Cross-browser testing
- ⏳ Final content review & proofing
- ⏳ Analytics setup
- ⏳ Deployment & monitoring setup
- ⏳ Post-launch checks

## 6. Success Metrics

### Quantitative (Targets)
- Page load time < 3 seconds ⏳ **pending validation**
- Mobile usability score > 90 (Google) ⏳ **pending validation**
- Contact form conversion rate target: 5% ⏳ **pending form backend**
- WhatsApp click-through rate target: 15% ✅ **UI ready**
- Organic search visibility for target keywords ⏳ **pending GA setup**

### Qualitative
- Professional appearance matching industry expectations ✅
- Clear communication of service offerings ✅
- Easy navigation to contact information ✅
- Trust-building through social proof ✅ (testimonials placeholder)
- Accurate representation of CSMS expertise ✅

### Current Status
- **Core features: ~90% complete**
- **Pages: 34/34 generated**
- **Sitemap routes: 33**
- **Content blocks: 33 types**
- **Articles: 13/13 with structured blocks + CTA**
- **Build status: Passing**

## 7. Content Maintenance Plan

### Regular Updates (Implemented)
- Quarterly review of service offerings ✅ (structure ready)
- Bi-annual testimonial updates ✅ (structure ready)
- Annual performance statistics refresh ✅ (structure ready)
- As-needed CSMS regulatory updates ✅ (structure ready)

### Content Governance (Implemented)
- Designated content owner for updates ✅ (structure ready)
- Review process for service description changes ✅ (structure ready)
- Version control for content changes ✅ (Git)
- Backup and recovery procedures ✅ (Git + build artifacts)

### Pending Enhancements
- Automated content validation scripts ⏳
- Content preview workflow for editors ⏳
- Automated SEO validation ⏳

## 8. Out of Scope (vs PRD.md)

This plan intentionally excludes:
- Content registry system (not needed for services site)
- Workflow engine for mass content updates
- User authentication/registration
- CMS dashboard for content editors
- API for programmatic content access
- Multi-language support (Indonesian only)

*(Catatan: Bagian Blog/Artikel yang sebelumnya dikecualikan kini dimasukkan kembali ke dalam ruang lingkup untuk mendukung SEO organik dan pembaruan berkala situs.)*

---
*This plan is specific to the konsultancsms.com CSMS consulting website implementation. Technical framework details are covered in PRD.md.*