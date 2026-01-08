import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TodoInputProps {
  onAdd: (title: string) => void;
  isAdding: boolean;
}

export function TodoInput({ onAdd, isAdding }: TodoInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAdd(trimmedTitle);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isAdding}
        className="flex-1 text-base"
        data-testid="input-new-todo"
      />
      <Button
        type="submit"
        disabled={!title.trim() || isAdding}
        className="px-6"
        data-testid="button-add-todo"
      >
        {isAdding ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        <span className="ml-2 hidden sm:inline">Add Task</span>
      </Button>
    </form>
  );
}
