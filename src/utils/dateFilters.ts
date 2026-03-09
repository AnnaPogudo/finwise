export function parseTransactionDate(dateStr: string): Date {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

export function isToday(d: Date): boolean {
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

export function isLast7Days(d: Date): boolean {
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  return d.getTime() >= sevenDaysAgo && d.getTime() <= now;
}

export function isCurrentMonth(d: Date): boolean {
  const today = new Date();
  return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
}

export type PeriodTab = 0 | 1 | 2;

export function filterByPeriod<T extends { date: string }>(
  items: T[],
  period: PeriodTab
): T[] {
  return items.filter((t) => {
    const d = parseTransactionDate(t.date);
    if (period === 0) return isToday(d);
    if (period === 1) return isLast7Days(d);
    return isCurrentMonth(d);
  });
}
