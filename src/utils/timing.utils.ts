export const formattedTime = (secs: number) =>
    `${Math.floor(secs / 60)}m ${secs % 60}s`;