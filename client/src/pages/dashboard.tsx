import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { TodoInput } from "@/components/todo-input";
import { TodoList } from "@/components/todo-list";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/auth-utils";
import type { Todo } from "@shared/schema";

export default function Dashboard() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Session expired",
        description: "Please log in again.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [authLoading, isAuthenticated, toast]);

  const {
    data: todos = [],
    isLoading: todosLoading,
  } = useQuery<Todo[]>({
    queryKey: ["/api/todos"],
    enabled: isAuthenticated,
  });

  const addMutation = useMutation({
    mutationFn: async (title: string) => {
      return apiRequest("POST", "/api/todos", { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Session expired",
          description: "Please log in again.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isCompleted }: { id: string; isCompleted: boolean }) => {
      setUpdatingIds((prev) => new Set(prev).add(id));
      return apiRequest("PUT", `/api/todos/${id}`, { isCompleted });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Session expired",
          description: "Please log in again.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: (_, __, variables) => {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(variables.id);
        return next;
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      setUpdatingIds((prev) => new Set(prev).add(id));
      return apiRequest("PUT", `/api/todos/${id}`, { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Session expired",
          description: "Please log in again.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: (_, __, variables) => {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(variables.id);
        return next;
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      setDeletingIds((prev) => new Set(prev).add(id));
      return apiRequest("DELETE", `/api/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Session expired",
          description: "Please log in again.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: (_, __, id) => {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
  });

  const handleAdd = (title: string) => {
    addMutation.mutate(title);
  };

  const handleToggle = (id: string, isCompleted: boolean) => {
    toggleMutation.mutate({ id, isCompleted });
  };

  const handleUpdate = (id: string, title: string) => {
    updateMutation.mutate({ id, title });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const activeTodoCount = todos.filter((t) => !t.isCompleted).length;

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-8 md:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl" data-testid="text-welcome">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
          </h1>
          <p className="text-muted-foreground" data-testid="text-task-summary">
            {activeTodoCount === 0
              ? "You're all caught up!"
              : `You have ${activeTodoCount} active task${activeTodoCount === 1 ? "" : "s"}`}
          </p>
        </div>

        <div className="mb-8">
          <TodoInput onAdd={handleAdd} isAdding={addMutation.isPending} />
        </div>

        <TodoList
          todos={todos}
          isLoading={todosLoading}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          updatingIds={updatingIds}
          deletingIds={deletingIds}
        />
      </main>
    </div>
  );
}
