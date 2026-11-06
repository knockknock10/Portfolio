"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "./icons"

export function PaperViewer({pdf,title}:{pdf:string;title:string}) {
  const [open,setOpen]=useState(false)
  useEffect(()=>{
    if(!open)return
    const previousOverflow=document.body.style.overflow
    document.body.style.overflow="hidden"
    const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)}
    window.addEventListener("keydown",onKey)
    return ()=>{
      document.body.style.overflow=previousOverflow
      window.removeEventListener("keydown",onKey)
    }
  },[open])
  return <>
    <button type="button" className="sk-btn sk-btn--light sk-btn--small" onClick={()=>setOpen(true)}>Read paper here <span aria-hidden="true">↗</span></button>
    {open ? <div className="gl-paper-viewer" role="dialog" aria-modal="true" aria-label={"Read "+title} onClick={()=>setOpen(false)}>
      <div className="gl-paper-viewer__card" onClick={event=>event.stopPropagation()}>
        <header className="gl-paper-viewer__header">
          <div><p>RESEARCH PAPER · PDF READER</p><h3>{title}</h3></div>
          <button type="button" className="sk-btn sk-btn--small" onClick={()=>setOpen(false)}>Close</button>
        </header>
        <iframe className="gl-paper-viewer__frame" src={pdf+"#toolbar=1&navpanes=0&view=FitH"} title={title+" full paper"} loading="lazy" />
        <footer className="gl-paper-viewer__footer">
          <span>PDF preview uses your browser&apos;s built-in document viewer.</span>
          <div><a className="sk-text-link" href={pdf} target="_blank" rel="noreferrer">Open in new tab <ArrowUpRight /></a><a className="sk-text-link" href={pdf} download="SemBind.pdf">Download PDF ↓</a></div>
        </footer>
      </div>
    </div> : null}
  </>
}
