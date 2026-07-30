import { useState } from 'react';
import Home from './Home';
import ServiceAdmin from './ServiceAdmin';

export default function AdminApp() {
  const [tab, setTab] = useState<'teaching' | 'service'>('teaching');
  const switchTab = () => setTab((t) => (t === 'teaching' ? 'service' : 'teaching'));

  return tab === 'teaching'
    ? <Home adminTab="teaching" onAdminSwitch={switchTab} />
    : <ServiceAdmin onAdminSwitch={switchTab} />;
}
