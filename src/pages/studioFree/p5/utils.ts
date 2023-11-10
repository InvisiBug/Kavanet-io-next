import { Gym, ActivitiesEntity } from "./types";

export const parseSchedule = (data: ActivitiesEntity[]) => {
  const numDays = 5;
  let busySchedule: Schedule[][] = [];
  let freeSchedule: Schedule[][] = [];

  interface Schedule {
    start: string;
    end: string;
    duration?: number;
  }

  //* Create an array of times the studio is in use over the next 3 days
  Array.from({ length: numDays }).forEach((_, dayIndex: number) => {
    let todaysSchedule = new Array<Schedule>();

    data.forEach((element: ActivitiesEntity) => {
      if (element.studio === "Studio") {
        const d = new Date();

        const now = new Date(d.setDate(d.getDate() + dayIndex));
        const date = new Date(Date.parse(element.startDateTime.dateTime));

        // Get only the events for the day
        if (now.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0)) {
          const startHours = String(new Date(element.startDateTime.dateTime).getHours()).padStart(2, "0");
          const startMinutes = String(new Date(element.startDateTime.dateTime).getMinutes()).padStart(2, "0");

          const endHours = String(new Date(Date.parse(element.startDateTime.dateTime) + element.duration * 60000).getHours()).padStart(2, "0");
          const endMinutes = String(new Date(Date.parse(element.startDateTime.dateTime) + element.duration * 60000).getMinutes()).padStart(2, "0");

          todaysSchedule.push({
            start: `${startHours}:${startMinutes}`,
            end: `${endHours}:${endMinutes}`,
            duration: element.duration,
          });
        }
      }
    });
    busySchedule.push(todaysSchedule);
  });

  // //* Create an array of times the studio is free over the next 3 days
  // Array.from({ length: numDays }).forEach((_, dayIndex: number) => {
  //   freeSchedule.push(getFreeTimes(busySchedule[dayIndex]));
  // });

  let finalSchedule = new Array<string[]>();

  Array.from({ length: numDays }).forEach((_, dayIndex: number) => {
    finalSchedule.push(markTimeline(busySchedule[dayIndex]));
  });

  return finalSchedule;
};

export function getFreeTimes(inUseTimes: { start: string; end: string }[]): { start: string; end: string }[] {
  // Sort the in-use times
  inUseTimes.sort((a, b) => a.start.localeCompare(b.start));

  let freeTimes: { start: string; end: string }[] = [];
  let freeTimeEnd = "00:00";

  for (let inUseTime of inUseTimes) {
    if (freeTimeEnd !== inUseTime.start) {
      freeTimes.push({ start: freeTimeEnd, end: inUseTime.start });
    }
    freeTimeEnd = inUseTime.end;
  }

  if (freeTimeEnd !== "23:59") {
    freeTimes.push({ start: freeTimeEnd, end: "23:59" });
  }

  return freeTimes;
}

export function getFreeTimesSchedule(schedule: { start: string; end: string; duration: number }[]): { start: string; end: string }[] {
  // Sort the schedule by start time
  schedule.sort((a, b) => a.start.localeCompare(b.start));

  let freeTimes: { start: string; end: string }[] = [];
  let freeTimeEnd = "00:00";

  for (let i = 0; i < schedule.length; i++) {
    let current = schedule[i];
    let next = schedule[i + 1];

    if (next && current.end !== next.start) {
      freeTimes.push({ start: current.end, end: next.start });
    } else if (!next && current.end !== "23:59") {
      freeTimes.push({ start: current.end, end: "23:59" });
    }

    freeTimeEnd = current.end;
  }

  return freeTimes;
}

export function markTimeline(studioInUseToday: { start: string; end: string }[]) {
  // Initialize the timeline
  let timeline = new Array<string>((24 * 60) / 15).fill(" ");

  // Mark the times in the timeline
  for (let timeSlot of studioInUseToday) {
    let start = (parseInt(timeSlot.start.split(":")[0]) * 60 + parseInt(timeSlot.start.split(":")[1])) / 15;
    let end = (parseInt(timeSlot.end.split(":")[0]) * 60 + parseInt(timeSlot.end.split(":")[1])) / 15;

    for (let i = start; i < end; i++) {
      timeline[i] = "X";
    }
  }
  return timeline;
}

export function timeBetweenDates(date1: Date, date2: Date): string {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  const diffInSecs = Math.floor(diffInMs / 1000);
  const days = Math.floor(diffInSecs / 86400);
  const hours = Math.floor(diffInSecs / 3600) % 24;
  const minutes = Math.floor(diffInSecs / 60) % 60;
  const seconds = diffInSecs % 60;
  return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
}
