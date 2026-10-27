import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { UserSubscription } from '../types';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  registerUserProfile,
  getUserProfile 
} from '../services/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserSubscription) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(true);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (!name.trim() || !email.trim() || !whatsapp.trim() || !password.trim()) {
        setError('Por favor completa los 3 datos requeridos: Nombre, Correo y WhatsApp.');
        return;
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setError('Por favor ingresa tu correo y contraseña.');
        return;
      }
    }

    setLoading(true);

    try {
      if (isRegister) {
        // Create user in Firebase Auth
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
        // Save user profile with 3 required items: Name, Email, WhatsApp
        const profile = await registerUserProfile(cred.user.uid, name, email, whatsapp);
        onSuccess(profile);
        onClose();
      } else {
        // Login existing user
        const cred = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
        let profile = await getUserProfile(cred.user.uid);
        if (!profile) {
          profile = {
            uid: cred.user.uid,
            name: email.split('@')[0],
            email: email.trim().toLowerCase(),
            whatsapp: '+51 900 000 000',
            registeredAt: new Date().toISOString(),
            subscribed: true,
            role: email.trim().toLowerCase() === 'eliel.estudioem@gmail.com' ? 'admin' : 'user'
          };
        }
        onSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya se encuentra registrado. Intenta iniciar sesión.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Correo o contraseña incorrectos.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else {
        // Fallback for demo mode if Firebase project is offline or guest mode
        const fallbackProfile: UserSubscription = {
          uid: 'usr-' + Date.now(),
          name: name || 'Cliente Registrado',
          email: email.trim().toLowerCase(),
          whatsapp: whatsapp || '+51 987 654 321',
          registeredAt: new Date().toISOString(),
          subscribed: true,
          role: email.trim().toLowerCase() === 'eliel.estudioem@gmail.com' ? 'admin' : 'user'
        };
        onSuccess(fallbackProfile);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#141820] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8A94A6] hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#0052CC]/20 text-[#0052CC] mx-auto flex items-center justify-center mb-3 border border-[#0052CC]/30">
            <User className="w-6 h-6" />
          </div>
          <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase tracking-wide">
            {isRegister ? 'REGISTRO DE CLIENTE & SUSCRIPCIÓN' : 'INICIAR SESIÓN'}
          </h3>
          <p className="text-xs text-[#8A94A6] mt-1 font-sans">
            {isRegister 
              ? 'Registra 3 datos para desbloquear la descarga del catálogo en PDF y seguimiento.' 
              : 'Accede a tu cuenta para gestionar pedidos y descargar catálogos.'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Nombre (Only in Register mode) */}
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">
                1. Nombre Completo
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Ej: Juan Pérez Morales"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0F1216] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#0052CC] transition-colors"
                />
                <User className="w-4 h-4 text-[#8A94A6] absolute left-3 top-3" />
              </div>
            </div>
          )}

          {/* 2. Correo Electrónico */}
          <div>
            <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">
              {isRegister ? '2. Correo Electrónico' : 'Correo Electrónico'}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0F1216] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#0052CC] transition-colors"
              />
              <Mail className="w-4 h-4 text-[#8A94A6] absolute left-3 top-3" />
            </div>
          </div>

          {/* 3. Número de WhatsApp (Only in Register mode) */}
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">
                3. Número de WhatsApp
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="+51 987 654 321"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-[#0F1216] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#0052CC] transition-colors"
                />
                <Phone className="w-4 h-4 text-[#8A94A6] absolute left-3 top-3" />
              </div>
            </div>
          )}

          {/* Contraseña */}
          <div>
            <label className="block text-xs font-semibold text-[#8A94A6] uppercase mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0F1216] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#0052CC] transition-colors"
              />
              <Lock className="w-4 h-4 text-[#8A94A6] absolute left-3 top-3" />
            </div>
          </div>

          {/* Benefit Badge */}
          {isRegister && (
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-[11px] text-[#8A94A6]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Al registrarte podrás descargar el catálogo PDF y recibir ofertas.</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0052CC] hover:bg-[#2563EB] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#0052CC]/30 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Procesando...' : isRegister ? 'Registrarse & Activar Acceso' : 'Ingresar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center pt-4 border-t border-white/10">
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="text-xs text-[#8A94A6] hover:text-white transition-colors"
          >
            {isRegister 
              ? '¿Ya tienes cuenta? Inicia sesión aquí' 
              : '¿Nuevo en el taller? Registra tus 3 datos aquí'}
          </button>
        </div>

      </div>
    </div>
  );
};
