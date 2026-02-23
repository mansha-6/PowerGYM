type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  action: string;
  details?: Record<string, unknown>;
  userId?: string;
}

class Logger {
  private logs: LogEntry[] = [];

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private createEntry(level: LogLevel, action: string, details?: Record<string, unknown>, userId?: string): LogEntry {
    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level,
      action,
      details,
      userId,
    };
    this.logs.push(entry);
    return entry;
  }

  private formatLog(entry: LogEntry): string {
    const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.action}`;
    if (entry.userId) {
      return `${base} | User: ${entry.userId}`;
    }
    return base;
  }

  info(action: string, details?: Record<string, unknown>, userId?: string): void {
    const entry = this.createEntry('info', action, details, userId);
    console.log(`%c${this.formatLog(entry)}`, 'color: #3b82f6', details || '');
  }

  warn(action: string, details?: Record<string, unknown>, userId?: string): void {
    const entry = this.createEntry('warn', action, details, userId);
    console.warn(`%c${this.formatLog(entry)}`, 'color: #f59e0b', details || '');
  }

  error(action: string, details?: Record<string, unknown>, userId?: string): void {
    const entry = this.createEntry('error', action, details, userId);
    console.error(`%c${this.formatLog(entry)}`, 'color: #ef4444', details || '');
  }

  debug(action: string, details?: Record<string, unknown>, userId?: string): void {
    const entry = this.createEntry('debug', action, details, userId);
    console.debug(`%c${this.formatLog(entry)}`, 'color: #8b5cf6', details || '');
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export const logger = new Logger();
