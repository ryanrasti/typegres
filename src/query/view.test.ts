import { describe, expect, it } from "vitest";
import { Int4, Text } from "../types/index";
import { values } from "./values";
import { assert, Equals } from "tsafe";
import { withDb } from "../test/db";
import { testDb } from "../db.test";
import { select } from "../grammar";
import { View } from "./db";
import * as Types from "../types/index";

describe("View tests", () => {
  it("can create a view from values() and select from it", async () => {
    await withDb(testDb, async (kdb) => {
      // Create a view from values
      const dataSource = values(
        {
          id: Int4.new(1),
          name: Text.new("Alice"),
          department: Text.new("Engineering"),
        },
        {
          id: Int4.new(2),
          name: Text.new("Bob"),
          department: Text.new("Marketing"),
        },
        {
          id: Int4.new(3),
          name: Text.new("Charlie"),
          department: Text.new("Engineering"),
        },
      );

      const EmployeeView = View(dataSource);

      // Select from the view
      const res = await select(
        (e) => ({
          id: e.id,
          name: e.name,
          dept: e.department,
        }),
        {
          from: EmployeeView,
          where: (e) => e.department["="]("Engineering"),
          orderBy: [(e) => e.id, { asc: true }],
        },
      ).execute(kdb);

      assert<Equals<typeof res, { id: number; name: string; dept: string }[]>>();

      expect(res).toEqual([
        { id: 1, name: "Alice", dept: "Engineering" },
        { id: 3, name: "Charlie", dept: "Engineering" },
      ]);
    });
  });

  it("can extend a view and use custom methods", async () => {
    await withDb(testDb, async (kdb) => {
      // Create base data
      const projectData = values(
        {
          id: Int4.new(1),
          name: Text.new("Project Alpha"),
          status: Text.new("active"),
          budget: Int4.new(100000),
        },
        {
          id: Int4.new(2),
          name: Text.new("Project Beta"),
          status: Text.new("completed"),
          budget: Int4.new(75000),
        },
        {
          id: Int4.new(3),
          name: Text.new("Project Gamma"),
          status: Text.new("active"),
          budget: Int4.new(150000),
        },
        {
          id: Int4.new(4),
          name: Text.new("Project Delta"),
          status: Text.new("cancelled"),
          budget: Int4.new(50000),
        },
      );

      // Create base view
      const BaseProjectView = View(projectData);

      // Extend the view with custom methods
      class ProjectView extends BaseProjectView.extend<ProjectView>() {
        static activeProjects() {
          return select((p) => p, {
            from: ProjectView,
            where: (p) => p.status["="]("active"),
          });
        }

        displayBudget() {
          return this.budget["*"](Int4.new(100)).cast(Types.Text).textcat(" cents");
        }

        isHighBudget() {
          return this.budget[">="](100000);
        }

        statusLabel() {
          return this.status.textcat(" project");
        }
      }

      // Test basic select:
      const project = await ProjectView.select((p) => ({
        budget: p.displayBudget(),
      }))
        .orderBy((p) => p.budget, { asc: true })
        .execute(kdb);

      assert<Equals<typeof project, { budget: string }[]>>();
      expect(project).toEqual([
        { budget: "5000000 cents" },
        { budget: "7500000 cents" },
        { budget: "10000000 cents" },
        { budget: "15000000 cents" },
      ]);

      // Test static method
      const activeProjects = await ProjectView.activeProjects().execute(kdb);
      assert<Equals<typeof activeProjects, { id: number; name: string; status: string; budget: number }[]>>();
      expect(activeProjects).toHaveLength(2);
      expect(activeProjects.map((p) => p.name).sort()).toEqual(["Project Alpha", "Project Gamma"]);

      // Test instance methods in select
      const res = await select(
        (p) => ({
          name: p.name,
          budget: p.displayBudget(),
          highBudget: p.isHighBudget(),
          label: p.statusLabel(),
        }),
        {
          from: ProjectView,
          where: (p) => p.isHighBudget(),
          orderBy: [(p) => p.name, { asc: true }],
        },
      ).execute(kdb);

      assert<
        Equals<
          typeof res,
          {
            name: string;
            budget: string;
            highBudget: boolean;
            label: string;
          }[]
        >
      >();

      expect(res).toEqual([
        {
          name: "Project Alpha",
          budget: "10000000 cents",
          highBudget: true,
          label: "active project",
        },
        {
          name: "Project Gamma",
          budget: "15000000 cents",
          highBudget: true,
          label: "active project",
        },
      ]);

      // Test chaining with subquery
      const highBudgetActive = await select(
        (p) => ({
          name: p.name,
          budget: p.budget,
        }),
        {
          from: ProjectView.activeProjects(),
          where: (p) => p.isHighBudget(),
        },
      ).execute(kdb);

      expect(highBudgetActive).toHaveLength(2);
      expect(highBudgetActive.map((p) => p.budget)).toEqual([100000, 150000]);
    });
  });
});
