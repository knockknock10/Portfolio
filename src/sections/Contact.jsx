import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { profileInfo } from "../data/profile";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form submitted:", formData);
      await emailjs.send(
        "service_79b0nyj",
        "template_17us8im",
        {
          from_name: formData.name,
          to_name: profileInfo.name,
          from_email: formData.email,
          to_email: profileInfo.email,
          message: formData.message,
        },
        "pn-Bw_mS1_QQdofuV"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent!");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", "Something went wrong!");
    }
  };

  return (
    <section className="relative w-full py-32 sm:py-40 bg-bg-primary border-b border-border-card flex items-center justify-center overflow-hidden" id="contact">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#8b5cf6"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      
      <div className="flex flex-col items-center justify-center w-full max-w-lg p-8 sm:p-10 mx-6 border border-neutral-850 bg-bg-card/75 backdrop-blur-md rounded-2xl shadow-[0_12px_40_rgba(0,0,0,0.4)] relative z-10 hover:border-purple-500/20 transition-all duration-500">
        <div className="flex flex-col items-start w-full gap-3 mb-8">
          <span className="inline-block px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-semibold tracking-wider uppercase mono-font">
            Connection Link
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Let's Connect</h2>
          <p className="text-sm text-neutral-400 leading-relaxed mt-2">
            Whether you are looking to collaborate on a backend project, discuss systems design, or explore internship opportunities, feel free to reach out.
          </p>
        </div>

        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="field-label text-xs text-neutral-400 font-bold mb-1.5 block uppercase tracking-wider mono-font">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-bg-darker/60 border border-neutral-850 text-neutral-200 placeholder-neutral-600 text-xs focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all duration-300 backdrop-blur-sm"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="field-label text-xs text-neutral-400 font-bold mb-1.5 block uppercase tracking-wider mono-font">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-bg-darker/60 border border-neutral-850 text-neutral-200 placeholder-neutral-600 text-xs focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all duration-300 backdrop-blur-sm"
              placeholder="johndoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="field-label text-xs text-neutral-400 font-bold mb-1.5 block uppercase tracking-wider mono-font">
              Message Payload
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-bg-darker/60 border border-neutral-850 text-neutral-200 placeholder-neutral-600 text-xs focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all duration-300 backdrop-blur-sm"
              placeholder="Share details about your project or role..."
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 text-xs font-bold text-center rounded-lg cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_4px_20px_rgba(139,92,246,0.25)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 mono-font uppercase tracking-wider disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Deploying Message...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
