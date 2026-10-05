"use client";

import { useState } from "react";
import {
  Loader2,
  Check,
  AlertCircle,
  Shield,
  User,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

interface InputProps {
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  Icon?: React.ComponentType<{ className?: string }>;
  formData: Record<string, string | boolean>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  hasError: (field: string) => boolean;
}

function Input({
  label,
  type = "text",
  name,
  placeholder,
  Icon,
  formData,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  hasError,
}: InputProps) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-900 mb-2">
        {label} <span className="text-red-500" aria-hidden="true">*</span>
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name] as string}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full rounded-xl border-2 bg-white transition-all duration-200 focus:outline-none focus:ring-2 ${
            Icon ? "pl-12" : "px-4"
          } py-3 ${
            hasError(name)
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : touched[name]
              ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
              : "border-gray-200 focus:border-blue focus:ring-blue/20"
          } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          placeholder={placeholder}
          disabled={isSubmitting}
          aria-invalid={hasError(name) ? "true" : "false"}
          aria-describedby={hasError(name) ? `${name}-error` : ""}
        />
      </div>
      {hasError(name) && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {errors[name]}
        </p>
      )}
      {touched[name] && !hasError(name) && formData[name] && (
        <p className="mt-1.5 text-sm text-green-500 flex items-center gap-1">
          <Check className="h-4 w-4 flex-shrink-0" />
          Correcto
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
    acepto: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.correo.trim()) newErrors.correo = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) newErrors.correo = "Correo inválido";
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio";
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es obligatorio";
    if (!formData.acepto) newErrors.acepto = "Debes aceptar el uso de tus datos";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      nombre: true,
      correo: true,
      telefono: true,
      mensaje: true,
      acepto: true,
    });
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ nombre: "", correo: "", telefono: "", mensaje: "", acepto: false });
      setTouched({});
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const hasError = (field: string) => Boolean(touched[field] && errors[field]);


  return (
    <section className="py-16 sm:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24 space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue/10 text-blue text-sm font-semibold">
              <Shield className="h-4 w-4" />
              Solicitud de renta
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Renta tu local en <span className="text-blue">Plaza Fiesta San Agustín</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Somos el centro comercial con mayor afluencia de la zona. Ofrecemos espacios comerciales
              diseñados para que tu negocio crezca desde el primer día.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Nombre completo"
                  type="text"
                  name="nombre"
                  placeholder="Juan Pérez"
                  Icon={User}
                  formData={formData}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={hasError}
                />
                <Input
                  label="Correo electrónico"
                  type="email"
                  name="correo"
                  placeholder="juan@ejemplo.com"
                  Icon={Mail}
                  formData={formData}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={hasError}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Teléfono"
                  type="tel"
                  name="telefono"
                  placeholder="+52 55 1234 5678"
                  Icon={Phone}
                  formData={formData}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={hasError}
                />
                <div className="sm:col-span-2">
                  <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-900 mb-2">
                    Mensaje <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                        hasError("mensaje")
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : touched.mensaje
                          ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                          : "border-gray-200 focus:border-blue focus:ring-blue/20"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      placeholder="Cuéntanos qué tipo de local buscas, metros cuadrados, presupuesto, ubicación preferida..."
                      disabled={isSubmitting}
                      aria-invalid={hasError("mensaje") ? "true" : "false"}
                      aria-describedby={hasError("mensaje") ? "mensaje-error" : ""}
                    />
                    <MessageSquare className="absolute right-4 top-4 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                  {hasError("mensaje") && (
                    <p id="mensaje-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {errors.mensaje}
                    </p>
                  )}
                  {touched.mensaje && !hasError("mensaje") && formData.mensaje && (
                    <p className="mt-1.5 text-sm text-green-500 flex items-center gap-1">
                      <Check className="h-4 w-4 flex-shrink-0" />
                      Correcto
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <input
                  type="checkbox"
                  id="acepto"
                  name="acepto"
                  checked={formData.acepto}
                  onChange={handleChange}
                  onBlur={() => setTouched((prev) => ({ ...prev, acepto: true }))}
                  className={`mt-0.5 h-5 w-5 rounded border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 ${
                    hasError("acepto")
                      ? "border-red-500 text-red-500 focus:ring-red-500/20"
                      : touched.acepto && formData.acepto
                      ? "border-green-500 text-green-500 focus:ring-green-500/20"
                      : "border-gray-300 text-blue focus:ring-blue/20 hover:border-gray-400"
                  }`}
                  disabled={isSubmitting}
                  aria-invalid={hasError("acepto") ? "true" : "false"}
                />
                <label htmlFor="acepto" className="text-sm text-gray-600 leading-relaxed">
                  Acepto el <a href="/aviso-privacidad" className="text-blue underline hover:text-blue/80 font-medium">Aviso de Privacidad</a> y autorizo el uso de mis datos personales para ser contactado.
                  <span className="text-red-500" aria-hidden="true">*</span>
                </label>
              </div>
              {hasError("acepto") && (
                <p className="ml-8 text-sm text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {errors.acepto}
                </p>
              )}

              <div className="rounded-xl bg-white/50 border border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white">
                    <Shield className="h-3 w-3 text-blue" />
                  </span>
                  <span>Protegido por reCAPTCHA</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-blue">
                  <a href="/terminos" className="underline hover:text-blue/80">Términos</a>
                  <span className="text-gray-300">|</span>
                  <a href="/privacidad" className="underline hover:text-blue/80">Privacidad</a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full rounded-full bg-blue px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue/30 hover:bg-blue/90 hover:shadow-xl hover:shadow-blue/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:hover:shadow-blue/30 transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Enviando solicitud...
                  </span>
                ) : (
                  "Enviar solicitud"
                )}
              </button>

              {submitStatus === "success" && (
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm" role="status">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="font-medium">¡Solicitud enviada con éxito! Te contactaremos en menos de 24 horas.</span>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 flex-shrink-0">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Error al enviar. Por favor, inténtalo de nuevo.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}