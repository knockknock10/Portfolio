export const sembindAudio = {
  id: 'sembind-audio',
  number: '03',
  title: 'SemBind-Audio',
  category: 'Research / Applied AI',
  summary:
    'Semantic-aware zero-trust audio watermarking: transformer-based representation picks where bits go, SHA-256 binds what they mean.',
  status: 'Research complete · manuscript in draft',
  github: 'https://github.com/knockknock10/SemBind_Audio',
  demo: null,
  seo: {
    title: 'Sanjeev Kumar — SemBind-Audio',
    description:
      'SemBind-Audio: a semantic-aware zero-trust audio watermarking framework using frozen HuBERT representations for embedding-location selection and SHA-256 payload binding.',
  },
  fullTitle:
    'SemBind-Audio: A Semantic-Aware Zero-Trust Audio Watermarking Framework via Transformer-Based Representation and Cryptographic Binding',
  card: {
    problem:
      'Watermark placement is usually arbitrary or purely spectral; payload integrity is checked separately. Neither ties embedding to what the audio means.',
    built:
      'A pipeline where frozen HuBERT representations score spectro-temporal regions by semantic contribution, drive adaptive embedding, and a SHA-256 digest binds the payload cryptographically.',
  },
  stack: [
    { label: 'Models', items: ['HuBERT (frozen)'] },
    { label: 'Signal', items: ['STFT', 'ISTFT'] },
    { label: 'Crypto', items: ['SHA-256'] },
    { label: 'Runtime', items: ['Python', 'PyTorch'] },
    { label: 'Data', items: ['LibriSpeech test-clean'] },
  ],
  tags: ['PyTorch', 'HuBERT', 'STFT', 'SHA-256', 'Python'],
  pipeline: [
    { title: 'Audio', sub: '16 kHz waveform' },
    { title: 'STFT / Spectrogram', sub: 'n_fft 1024 · hop 320' },
    { title: 'Transformer Representation', sub: 'frozen HuBERT · 768-d' },
    { title: 'Semantic Saliency', sub: 'leave-one-out contribution' },
    { title: 'Embedding Location Selection', sub: 'semantic × spectral score' },
    { title: 'Adaptive Embedding', sub: 'δ 0.002–0.008 per region' },
    { title: 'Cryptographic Binding', sub: 'SHA-256 · 256-bit payload' },
    { title: 'Verification', sub: 'reference extraction · majority vote' },
  ],
  overview: [
    'SemBind-Audio is a research project investigating one question: can pretrained audio representations supply an explicit semantic criterion for choosing where a watermark’s bits go — and can the payload itself be cryptographically bound rather than merely robust?',
    'The full experiment campaign E1–E14 ran against LibriSpeech test-clean (2,620 recordings), and the evidence package backing the manuscript passes its automated validation checks.',
  ],
  problem: [
    'Classic watermarking answers “where can I hide bits with least distortion?” — usually a spectral criterion. It does not answer “which parts of this audio carry meaning?”, and payload integrity is usually handled by a separate robustness mechanism, not by the embedding itself.',
    'Zero-trust framing adds a second requirement: verification should not require trusting the stored metadata. Re-hashing candidate metadata and comparing against the embedded digest makes the payload self-verifying.',
  ],
  approach: [
    'Frozen HuBERT produces frame-level representations. For each spectro-temporal region, a leave-one-out measure estimates how much that region contributes to the whole-clip representation (closed-form: Δᵢ = 1 − cos(G, G⁽⁻ⁱ⁾)), which becomes a semantic suitability score.',
    'Semantic suitability is combined multiplicatively with spectral suitability (α = 0.70, β = 0.30) into a joint score. The score decides three things: which coordinates receive payload bits, how strong the perturbation is (δ ∈ [0.002, 0.008]), and — indirectly — how detectable the change is (SNR).',
    'The payload is not a raw message: it is the SHA-256 digest of a canonical JSON binding (semantic fingerprint + owner ID + timestamp). 256 bits × 3 replicas are allocated to unique coordinates; extraction is reference-based with majority voting per bit, and verification re-hashes candidate metadata and compares digests.',
  ],
  architecture: {
    intro: 'The implemented pipeline, stage by stage, exactly as the canonical methodology runs it.',
    diagram: null,
    pipeline: true,
  },
  implementation: [
    'Canonical implementation lives in final_methodology.py, driven by scripts/final_run.py (experiments E1–E14) with a frozen config and config hash recorded in every results file.',
    'HuBERT (facebook/hubert-base-ls960) runs frozen with half-precision embeddings cached to disk; device selection prefers Apple MPS, then CUDA, then CPU.',
    'Coordinate allocation is deterministic: 768 unique (frequency, time) coordinates, time frames ordered by descending suitability, replicas split across timeline thirds, frequency bins via a coprime stride — with uniqueness asserted and a collision-repair fallback.',
    'An evidence package backs the manuscript: experiment register, number-traceability CSVs, tables, figures, and an automated validation pass that reports all checks PASS.',
  ],
  decisions: [
    {
      decision: 'Frozen HuBERT with leave-one-out contribution — not fine-tuned, not embedding similarity',
      why: 'A frozen model makes the semantic criterion reproducible and cheap to cache; leave-one-out measures each region’s actual contribution to the whole-clip representation instead of correlating frame embeddings.',
      tradeoff: '2,620 recordings × inference handled with an on-disk float16 cache.',
      cost: 'The score depends on one model family — only HuBERT is implemented (wav2vec2 is a placeholder, and AST/CLAP/AudioMAE were never run).',
    },
    {
      decision: 'Multiplicative joint score, not a weighted sum',
      why: 'A region with near-zero suitability in either dimension should be suppressed, not averaged up by the other — the code comment states it explicitly: multiplicative, NOT a sum.',
      tradeoff: 'Selection becomes sharply selective about where bits land.',
      cost: 'α/β become hyperparameters that must be swept (E5 did exactly that).',
    },
    {
      decision: 'Embed the SHA-256 digest of bound metadata, not a free-form message',
      why: 'Zero-trust verification: re-hash candidate metadata (project, owner, timestamp, semantic fingerprint) and compare digests. The payload cannot be forged without breaking the hash.',
      tradeoff: 'Authentication becomes binary and exact — 256 bits, no partial matches.',
      cost: 'Robustness of the payload equals robustness of every embedded bit; there is no error-tolerant message space.',
    },
    {
      decision: '3 replicas per bit with majority voting, reference-based extraction',
      why: 'Majority voting over independently allocated replicas fixes isolated bit corruption; reference-based extraction (compare against the original) is the simplest correct decoder.',
      tradeoff: 'R = 3 achieved 100% payload recovery with BER 0 in clean-channel runs.',
      cost: 'Non-blind: verification needs the reference audio — and the E7 sweep showed redundancy is non-monotonic (R = 1 outperformed R = 2), which is documented, not hidden.',
    },
  ],
  challenges: [
    {
      title: 'Coordinate collisions silently corrupted bits',
      body: 'The original allocator produced duplicate (freq, time) pairs, so two payload bits overwrote one coefficient — and the “99.1% direct accuracy” numbers of that era were artifacts. Fixed with asserted uniqueness plus a repair loop; stale numbers were banned by an automated validation check.',
    },
    {
      title: 'Boundary frames vanished in the round trip',
      body: 'With center=True STFT, the outermost frames sit where the Hann synthesis window tapers to ~0 — single-coefficient edits were wiped by ISTFT → STFT. Fix: exclude one boundary frame per side. BER went from 0.000078 → 0.000000 on a 200-recording run.',
    },
    {
      title: 'Perturbations lose most of their magnitude per round trip',
      body: 'After ISTFT → STFT, a perturbation δ recovers at only a fraction of its original magnitude, leaving an extraction margin far below typical attack perturbation levels. This is the root cause of the robustness result below — a fundamental limitation of editing individual STFT coefficients, not a bug to patch.',
    },
    {
      title: 'Destructive interference between perturbations',
      body: 'After ISTFT, the simultaneous perturbations of all 256 payload bits can interfere with each other — visible as the random-selection baseline’s residual bit failures (99.96% payload success vs 100% for the deterministic methods). Region selection and replica splitting mitigate it.',
    },
  ],
  outcome: [
    'Clean channel, n = 2,620 (LibriSpeech test-clean): 100% payload recovery and BER 0 for the deterministic methods; joint selection mean embedding SNR 75.37 dB. Spectral-only scored higher (77.16 dB) than joint or semantic-only — reported as measured, not as the hypothesis suggested.',
    'Authentication experiment: TP 500, TN 500, FP 0, FN 0, plus 500/500 truncation rejections — the SHA-256 binding verified exactly under tested scenarios.',
    'Robustness: payload success 0% under every tested attack (AWGN, resample, lowpass, scaling, MP3). The paper states this plainly and positions robust embedding as future work.',
    'The full E1–E14 campaign passed its automated validation checks (all PASS), with the evidence package organized for manuscript preparation.',
  ],
  lessons: [
    'Negative results are results. “Zero robustness under attack, root-caused to coefficient-level embedding” is a stronger outcome than a metric tuned to look good.',
    'The debugging write-up mattered more than the code: coordinate collisions, boundary frames, and magnitude loss were all found by diagnosing round trips, not by staring at the model.',
    'Validate your own numbers automatically — stale figures from superseded code were banned by a validation check, which is why the evidence package is trustworthy.',
  ],
  links: [
    { label: 'Repository', href: 'https://github.com/knockknock10/SemBind_Audio' },
  ],
}
