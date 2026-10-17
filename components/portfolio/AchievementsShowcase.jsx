"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./AchievementsShowcase.module.css";

function Icon({ kind }) {
  const props = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "cap") return <svg viewBox="0 0 24 24" {...props}><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3.7 3 8.3 3 12 0v-5M22 9v6"/></svg>;
  if (kind === "shield") return <svg viewBox="0 0 24 24" {...props}><path d="M12 3 20 6v5c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6z"/><path d="m8.5 12 2.3 2.2 4.7-5"/></svg>;
  if (kind === "external") return <svg viewBox="0 0 24 24" {...props}><path d="M13 5h6v6m0-6-9 9"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>;
  if (kind === "close") return <svg viewBox="0 0 24 24" {...props}><path d="m6 6 12 12M18 6 6 18"/></svg>;
  if (kind === "left") return <svg viewBox="0 0 24 24" {...props}><path d="M19 12H5m6-6-6 6 6 6"/></svg>;
  if (kind === "right") return <svg viewBox="0 0 24 24" {...props}><path d="M5 12h14m-6-6 6 6-6 6"/></svg>;
  if (kind === "book") return <svg viewBox="0 0 24 24" {...props}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22zM4 5.5V22m4-15h8m-8 4h7"/></svg>;
  return <svg viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}

function present(value) {
  return typeof value === "string" && value.trim() !== "" && value !== "MISSING";
}

function formatDate(value) {
  if (!present(value)) return "";
  if (value === "No expiry") return value;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  return new Date(value + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

function CredentialShelf({ items, onSelect }) {
  return (
    <article className={styles.credentialPanel}>
      <header className={styles.panelHeading}>
        <span className={styles.panelIcon}><Icon kind="shield"/></span>
        <div>
          <p className={styles.panelEyebrow}>CREDENTIAL ARCHIVE</p>
          <h3>Certifications &amp; credentials</h3>
        </div>
        <span className={styles.panelCount}>{String(items.length).padStart(2, "0")}</span>
      </header>
      <p className={styles.credentialShelfIntro}>
        Open any card to view a certificate full-screen. Add certificate images or PDFs to <code>public/certificates/</code>; the files are discovered automatically after the next build.
      </p>
      <div className={styles.credentialGrid}>
        {items.map((item, index) => {
          const placeholder = Boolean(item.isPlaceholder);
          const certificatePath = present(item.certificateImage) ? item.certificateImage : "";
          const isPdf = /\.pdf(?:$|[?#])/i.test(certificatePath);
          const imagePath = certificatePath && !isPdf ? certificatePath : present(item.badgeImage) ? item.badgeImage : "";
          return (
            <article className={styles.credentialCard} key={item.title + "-" + (item.issuer || index)}>
              <button type="button" className={styles.credentialPreview} onClick={() => onSelect(index)} aria-label={"View credential slot: " + item.title}>
                <span className={styles.credentialThumbnail} data-empty={placeholder || !imagePath ? "true" : "false"}>
                  {imagePath ? <img src={imagePath} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : null}
                  {!imagePath ? (
                    <span className={styles.credentialThumbnailArtwork}>
                      <span className={styles.credentialThumbnailTop}><i/><i/><i/></span>
                      <Icon kind="shield"/>
                      <span className={styles.credentialThumbnailLine}/>
                      <span className={styles.credentialThumbnailLine}/>
                      <span className={styles.credentialThumbnailLineShort}/>
                      <strong>{placeholder ? "CERTIFICATE SLOT" : isPdf ? "PDF CERTIFICATE" : "CREDENTIAL"}</strong>
                    </span>
                  ) : null}
                  {isPdf ? <span className={styles.pdfCorner}>PDF</span> : null}
                  {placeholder ? <span className={styles.slotBadge}>SLOT {String(index + 1).padStart(2, "0")}</span> : null}
                </span>
                <span className={styles.credentialCardTop}>
                  <span><small>{present(item.issuer) ? item.issuer : placeholder ? "Your issuer here" : "Issuer not supplied"}</small><h4>{placeholder ? "Add certificate " + String(index + 1).padStart(2, "0") : item.title}</h4></span>
                </span>
                {present(item.issueDate) ? <p>Issued {formatDate(item.issueDate)}</p> : placeholder ? <p>Issuer · date · verification</p> : null}
                <span className={styles.galleryOpenHint}>Open certificate <Icon kind="external"/></span>
              </button>
              {!placeholder && Array.isArray(item.skillsCovered) && item.skillsCovered.length ? <div className={styles.credentialTags}>{item.skillsCovered.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div> : null}
              {!placeholder && present(item.credentialUrl) ? <a className={styles.verifyCredential} href={item.credentialUrl} target="_blank" rel="noreferrer">Verify credential <Icon kind="external"/></a> : placeholder ? <span className={styles.notVerified}>Ready for your certificate</span> : <span className={styles.notVerified}>Verification link not supplied</span>}
            </article>
          );
        })}
      </div>
    </article>
  );
}

function CredentialLightbox({ item, index, total, onClose, onPrevious, onNext, dialogRef }) {
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => { setImageFailed(false); }, [item?.title, item?.certificateImage]);
  if (!item) return null;
  const placeholder = Boolean(item.isPlaceholder);
  const certificatePath = present(item.certificateImage) ? item.certificateImage : "";
  const isPdf = /\.pdf(?:$|[?#])/i.test(certificatePath);
  const imagePath = certificatePath && !isPdf ? certificatePath : present(item.badgeImage) ? item.badgeImage : "";

  return (
    <div
      ref={dialogRef}
      className={styles.certificateLightbox}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-lightbox-title"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <button type="button" className={styles.certificateClose} onClick={onClose} aria-label="Close certificate gallery"><Icon kind="close"/></button>
      {total > 1 ? <button type="button" className={styles.certificatePrevious} onClick={onPrevious} aria-label="Previous certificate"><Icon kind="left"/></button> : null}
      <div className={styles.certificateDialog}>
        <div className={styles.certificateImageStage} data-placeholder={placeholder ? "true" : "false"}>
          {isPdf ? (
            <iframe src={certificatePath} title={item.title + " certificate PDF"} />
          ) : imagePath && !imageFailed ? (
            <img src={imagePath} alt={item.title + (placeholder ? "" : " certificate image")} onError={() => setImageFailed(true)} />
          ) : (
            <div className={styles.certificateImageFallback}>
              <span className={styles.certificatePaperArtwork}><Icon kind="shield"/><i/><i/><i/></span>
              <strong>{placeholder ? "Your certificate goes here" : "Certificate preview unavailable"}</strong>
              <span>{placeholder ? "Add an image or PDF to public/certificates/ and rebuild." : "Check the certificate file path and try again."}</span>
            </div>
          )}
          <span className={styles.certificateCounter}>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>
        <div className={styles.certificateDetails}>
          <p className={styles.panelEyebrow}>{placeholder ? "READY-TO-POPULATE SLOT" : "CREDENTIAL VIEWER"}</p>
          <h2 id="certificate-lightbox-title">{placeholder ? "Add certificate " + String(index + 1).padStart(2, "0") : item.title}</h2>
          <p className={styles.certificateIssuer}>{present(item.issuer) ? item.issuer : placeholder ? "Issuer name will appear here" : "Issuer not supplied"}</p>
          {present(item.issueDate) ? <p><strong>Issued</strong><span>{formatDate(item.issueDate)}</span></p> : null}
          {present(item.expiryDate) ? <p><strong>Expiry</strong><span>{formatDate(item.expiryDate)}</span></p> : null}
          {present(item.credentialId) ? <p><strong>Credential ID</strong><span>{item.credentialId}</span></p> : null}
          {Array.isArray(item.skillsCovered) && item.skillsCovered.length ? <div className={styles.credentialTags}>{item.skillsCovered.map((skill) => <span key={skill}>{skill}</span>)}</div> : null}
          {present(item.credentialUrl) ? <a className={styles.certificateVerify} href={item.credentialUrl} target="_blank" rel="noreferrer">Open verification page <Icon kind="external"/></a> : placeholder ? <p className={styles.certificateInstructions}>Add the real certificate file to <code>public/certificates/</code>. Use its filename as the title, then add issuer/date/verification metadata to <code>PORTFOLIO-DATA.md</code> when available.</p> : <span className={styles.notVerified}>Verification link not supplied</span>}
        </div>
      </div>
      {total > 1 ? <button type="button" className={styles.certificateNext} onClick={onNext} aria-label="Next certificate"><Icon kind="right"/></button> : null}
    </div>
  );
}

/** @param {{ items?: import("@/lib/certifications").Certification[] }} props */
export default function AchievementsShowcase({ items = [] }) {
  const reducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const galleryItems = [...items];
  while (galleryItems.length < 10) {
    const slotNumber = galleryItems.length + 1;
    galleryItems.push({
      title: "Add certificate " + String(slotNumber).padStart(2, "0"),
      issuer: "MISSING",
      issueDate: "MISSING",
      expiryDate: "MISSING",
      credentialId: "MISSING",
      credentialUrl: "MISSING",
      skillsCovered: "MISSING",
      badgeImage: "MISSING",
      certificateImage: "MISSING",
      verificationStatus: "self-reported",
      isPlaceholder: true,
    });
  }
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const isGalleryOpen = selectedIndex !== null;
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .13 },
    transition: { duration: reducedMotion ? 0 : .38, delay: reducedMotion ? 0 : delay },
  });
  const selectedItem = selectedIndex !== null && galleryItems[selectedIndex] ? galleryItems[selectedIndex] : null;

  useEffect(() => {
    if (!isGalleryOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const closeButton = dialogRef.current?.querySelector('button[aria-label="Close certificate gallery"]');
    closeButton?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedIndex(null);
        return;
      }
      if (event.key === "ArrowLeft" && galleryItems.length > 1) {
        event.preventDefault();
        setSelectedIndex((value) => value === null ? null : (value - 1 + galleryItems.length) % galleryItems.length);
        return;
      }
      if (event.key === "ArrowRight" && galleryItems.length > 1) {
        event.preventDefault();
        setSelectedIndex((value) => value === null ? null : (value + 1) % galleryItems.length);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(dialogRef.current?.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])') ?? []);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      const restoreTarget = previousFocusRef.current;
      if (restoreTarget instanceof HTMLElement && restoreTarget.isConnected) restoreTarget.focus();
    };
  }, [isGalleryOpen, galleryItems.length]);

  function step(delta) {
    setSelectedIndex((value) => value === null || !galleryItems.length ? null : (value + delta + galleryItems.length) % galleryItems.length);
  }

  return (
    <section className={styles.achievementsSection} id="certifications" aria-labelledby="achievements-heading" tabIndex={-1}>
      <header className={styles.achievementsHeader}>
        <motion.div className={styles.achievementsIntro} {...reveal()}>
          <p className={styles.eyebrow}><span>08</span><i/> ACHIEVEMENTS &amp; CERTIFICATIONS <b/></p>
          <h2 id="achievements-heading">Progress worth<br/><span>proving.</span></h2>
          <p>Academic progress belongs here. Credentials open in a focused gallery when the issuer and evidence can be checked. No placeholder awards, invented competition placements, or inflated counters.</p>
          <div className={styles.achievementTags}><span>Academic record</span><span>Verifiable credentials</span><span>Evidence first</span></div>
        </motion.div>
        <motion.aside className={styles.academicSpotlight} {...reveal(.06)} aria-label="Academic highlight">
          <div className={styles.spotlightTop}><span><Icon kind="cap"/> ACADEMIC HIGHLIGHT</span><span>01 / RECORD</span></div>
          <div className={styles.spotlightValue}><strong>8.61</strong><span>CGPA</span></div>
          <div className={styles.spotlightRule}><i/></div>
          <p>One academic signal, alongside implementations, experiments and code that can be inspected across the portfolio.</p>
          <div className={styles.spotlightFoot}><span className={styles.spotlightDot}/> <span>Academic record</span></div>
        </motion.aside>
      </header>

      <motion.div {...reveal(.1)}>
        <CredentialShelf items={galleryItems} onSelect={setSelectedIndex}/>
      </motion.div>

      <motion.footer className={styles.achievementFooter} {...reveal(.13)}>
        <span className={styles.footerMark}><Icon kind="book"/></span>
        <div><strong>Specifics matter more than badge counts.</strong><span>Each record supports issuer, issue date, skills and a verification link where supplied.</span></div>
        <a href="/about">About my background <Icon kind="external"/></a>
      </motion.footer>

      {selectedItem ? <CredentialLightbox item={selectedItem} index={selectedIndex} total={galleryItems.length} dialogRef={dialogRef} onClose={() => setSelectedIndex(null)} onPrevious={() => step(-1)} onNext={() => step(1)}/> : null}
    </section>
  );
}
