export const StatCard = ({ icon: Icon, label, value, tone = 'rose' }) => {
  const tones = {
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/35 dark:text-rose-200',
    teal: 'bg-teal-50 text-teal-700 dark:bg-teal-950/35 dark:text-teal-200',
    sky: 'bg-sky-50 text-sky-700 dark:bg-sky-950/35 dark:text-sky-200',
    violet: 'bg-violet-50 text-violet-700 dark:bg-violet-950/35 dark:text-violet-200'
  };

  return (
    <div className="card p-5">
      <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg ${tones[tone]}`}>
        <Icon size={22} />
      </div>
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
};
