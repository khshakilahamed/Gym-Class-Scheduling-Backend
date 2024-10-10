export const bookingSearchableFields = [
      'date',
      // 'isCancel',
      'classScheduleId.title',
      'classScheduleId.day',
      'classScheduleId.duration',
      "userId.name",
      "userId.email",
];

export const bookingFilterableFields = [
      'searchTerm',
      'userId',
      'classSchedule',
      'date',
];
