"use client";

import { useState, KeyboardEvent } from "react";

type Task = {
  text: string;
  isEditing: boolean;
};

interface TaskSectionProps {
  title: string;
  color: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskPlanner() {
  const [morningTasks, setMorningTasks] = useState<Task[]>([]);
  const [eveningTasks, setEveningTasks] = useState<Task[]>([]);
  const [nightTasks, setNightTasks] = useState<Task[]>([]);

  // Handle Enter key press → Add Task
  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  ) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter" && target.value.trim() !== "") {
      setTasks((prev) => [...prev, { text: target.value, isEditing: false }]);
      target.value = "";
    }
  };

  // Delete Task
  const deleteTask = (
    index: number,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  ) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle Edit Mode
  const toggleEdit = (
    index: number,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  ) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  // Update Task
  const updateTask = (
    index: number,
    newText: string,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  ) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  // Section Component
  const TaskSection: React.FC<TaskSectionProps> = ({
    title,
    color,
    tasks,
    setTasks,
  }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
      <h2 className={`text-2xl font-bold mb-6 ${color}`}>{title}</h2>
      <input
        type="text"
        placeholder="Type & press Enter"
        className="w-full p-3 border rounded-lg focus:ring-2 outline-none mb-4"
        onKeyDown={(e) => handleKeyPress(e, setTasks)}
      />
      <ul className="space-y-3">
        {tasks.map((task, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-gray-50 border p-2 rounded-lg"
          >
            {task.isEditing ? (
              <input
                type="text"
                defaultValue={task.text}
                className="flex-1 p-2 border rounded-lg mr-2 focus:ring-2 outline-none"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    (e.target as HTMLInputElement).value.trim() !== ""
                  ) {
                    updateTask(idx, (e.target as HTMLInputElement).value, setTasks);
                  }
                }}
              />
            ) : (
              <span className="text-gray-700 flex-1">{task.text}</span>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => toggleEdit(idx, setTasks)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {task.isEditing ? "Save" : "Edit"}
              </button>
              <button
                onClick={() => deleteTask(idx, setTasks)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen text-green-500 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <TaskSection
          title="🌅 Morning Tasks"
          color="text-yellow-500"
          tasks={morningTasks}
          setTasks={setMorningTasks}
        />
        <TaskSection
          title="🌇 Evening Tasks"
          color="text-orange-500"
          tasks={eveningTasks}
          setTasks={setEveningTasks}
        />
        <TaskSection
          title="🌙 Night Tasks"
          color="text-indigo-600"
          tasks={nightTasks}
          setTasks={setNightTasks}
        />
      </div>
    </div>
  );
}
