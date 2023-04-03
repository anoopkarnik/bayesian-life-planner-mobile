import { View, Text } from 'react-native'
import React from 'react'
import { getTotalTasks,getTotalHabits,createTaskType,
  createHabitType,deleteTaskType,deleteHabitType,
  editTaskType,editHabitType,getTotalJournals,createJournalType,
  deleteJournalType,editJournalType,getTotalStats,createStatsType,
  editStatsType,deleteStatsType,getTotalSkills,createSkillType,
  editSkillType,deleteSkillType, getTotalGoals,createGoalType,
  editGoalType,deleteGoalType, getTotalBadHabits,editBadHabitType,
  createBadHabitType,deleteBadHabitType
 } from '../api/AdminAPI';

const ConfigureScreen = () => {
  return (
    <View>
      <Text>ConfigureScreen</Text>
    </View>
  )
}

export default ConfigureScreen