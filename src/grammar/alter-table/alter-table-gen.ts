export class RootBuilder extends Builder {
  $start = () => ({
    alterTableIfExistsOnly: this.alterTable0().ifExists0().only0().$fn2,
    alterTableIfExists: this.alterTable0().ifExists0().$fn2,
    alterTableOnly: this.alterTable0().only0().$fn2,
    alterTable: this.alterTable0().$fn2,
  });
  alterTable0 = () => this;
  ifExists0 = () => this;
  only0 = () => this;
  $fn2 = (name: Raw, param1: Raw, action: Raw) => ({});
}

export class ActionBuilder extends Builder {
  $start = () => ({
    addColumnIfNotExists: this.add0().column0().ifNotExists0().$fn5,
    addColumnIfNotExistsCollate: this.add0().column0().ifNotExists0().collate2().$fn7,
    addColumnIfNotExistsCollate: this.add0().column0().ifNotExists0().collate2().$fn6,
    addColumnIfNotExists: this.add0().column0().ifNotExists0().$fn6,
    addColumn: this.add0().column0().$fn5,
    addColumnCollate: this.add0().column0().collate2().$fn7,
    addColumnCollate: this.add0().column0().collate2().$fn6,
    addColumn: this.add0().column0().$fn6,
    addIfNotExists: this.add0().ifNotExists0().$fn5,
    addIfNotExistsCollate: this.add0().ifNotExists0().collate2().$fn7,
    addIfNotExistsCollate: this.add0().ifNotExists0().collate2().$fn6,
    addIfNotExists: this.add0().ifNotExists0().$fn6,
    add: this.add0().$fn5,
    addCollate: this.add0().collate2().$fn7,
    addCollate: this.add0().collate2().$fn6,
    add: this.add0().$fn6,
  });
  add0 = () => this;
  column0 = () => this;
  ifNotExists0 = () => this;
  collate2 = () => this;
  $fn5 = (column_name: Raw, data_type: Raw) => ({
    collate: this.collate2().$fn7,
    collate: this.collate2().$fn6,
    $: this.$fn6,
  });
  $fn7 = (collation: Raw) => ({ $: this.$fn6 });
  $fn6 = (column_constraint: Raw) => ({});
}

export class ColumnConstraintBuilder extends Builder {
  $start = () => ({
    constraint: this.constraint0().$fn14,
    constraintNotNullDeferrableInitiallyDeferred: this.constraint0().notNull0().deferrable0().initiallyDeferred0().$end,
    constraintNotNullDeferrableInitiallyImmediate: this.constraint0().notNull0().deferrable0().initiallyImmediate0()
      .$end,
    constraintNotNullNotDeferrableInitiallyDeferred: this.constraint0().notNull0().notDeferrable0().initiallyDeferred0()
      .$end,
    constraintNotNullNotDeferrableInitiallyImmediate: this.constraint0()
      .notNull0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintNotNullInitiallyDeferred: this.constraint0().notNull0().initiallyDeferred0().$end,
    constraintNotNullInitiallyImmediate: this.constraint0().notNull0().initiallyImmediate0().$end,
    constraintNullDeferrableInitiallyDeferred: this.constraint0().null0().deferrable0().initiallyDeferred0().$end,
    constraintNullDeferrableInitiallyImmediate: this.constraint0().null0().deferrable0().initiallyImmediate0().$end,
    constraintNullNotDeferrableInitiallyDeferred: this.constraint0().null0().notDeferrable0().initiallyDeferred0().$end,
    constraintNullNotDeferrableInitiallyImmediate: this.constraint0().null0().notDeferrable0().initiallyImmediate0()
      .$end,
    constraintNullInitiallyDeferred: this.constraint0().null0().initiallyDeferred0().$end,
    constraintNullInitiallyImmediate: this.constraint0().null0().initiallyImmediate0().$end,
    constraintCheck: this.constraint0().check0().$fn0,
    constraintCheckNoInheritDeferrableInitiallyDeferred: this.constraint0()
      .check0()
      .noInherit1()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintCheckNoInheritDeferrableInitiallyImmediate: this.constraint0()
      .check0()
      .noInherit1()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintCheckNoInheritNotDeferrableInitiallyDeferred: this.constraint0()
      .check0()
      .noInherit1()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintCheckNoInheritNotDeferrableInitiallyImmediate: this.constraint0()
      .check0()
      .noInherit1()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintCheckNoInheritInitiallyDeferred: this.constraint0().check0().noInherit1().initiallyDeferred0().$end,
    constraintCheckNoInheritInitiallyImmediate: this.constraint0().check0().noInherit1().initiallyImmediate0().$end,
    constraintCheckDeferrableInitiallyDeferred: this.constraint0().check0().deferrable0().initiallyDeferred0().$end,
    constraintCheckDeferrableInitiallyImmediate: this.constraint0().check0().deferrable0().initiallyImmediate0().$end,
    constraintCheckNotDeferrableInitiallyDeferred: this.constraint0().check0().notDeferrable0().initiallyDeferred0()
      .$end,
    constraintCheckNotDeferrableInitiallyImmediate: this.constraint0().check0().notDeferrable0().initiallyImmediate0()
      .$end,
    constraintCheckInitiallyDeferred: this.constraint0().check0().initiallyDeferred0().$end,
    constraintCheckInitiallyImmediate: this.constraint0().check0().initiallyImmediate0().$end,
    constraintDefault: this.constraint0().default0().$fn1,
    constraintDefaultDeferrableInitiallyDeferred: this.constraint0().default0().deferrable0().initiallyDeferred0().$end,
    constraintDefaultDeferrableInitiallyImmediate: this.constraint0().default0().deferrable0().initiallyImmediate0()
      .$end,
    constraintDefaultNotDeferrableInitiallyDeferred: this.constraint0().default0().notDeferrable0().initiallyDeferred0()
      .$end,
    constraintDefaultNotDeferrableInitiallyImmediate: this.constraint0()
      .default0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintDefaultInitiallyDeferred: this.constraint0().default0().initiallyDeferred0().$end,
    constraintDefaultInitiallyImmediate: this.constraint0().default0().initiallyImmediate0().$end,
    constraintGeneratedAlwaysAs: this.constraint0().generatedAlwaysAs0().$fn2,
    constraintGeneratedAlwaysAsStoredDeferrableInitiallyDeferred: this.constraint0()
      .generatedAlwaysAs0()
      .stored1()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintGeneratedAlwaysAsStoredDeferrableInitiallyImmediate: this.constraint0()
      .generatedAlwaysAs0()
      .stored1()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintGeneratedAlwaysAsStoredNotDeferrableInitiallyDeferred: this.constraint0()
      .generatedAlwaysAs0()
      .stored1()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintGeneratedAlwaysAsStoredNotDeferrableInitiallyImmediate: this.constraint0()
      .generatedAlwaysAs0()
      .stored1()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintGeneratedAlwaysAsStoredInitiallyDeferred: this.constraint0()
      .generatedAlwaysAs0()
      .stored1()
      .initiallyDeferred0().$end,
    constraintGeneratedAlwaysAsStoredInitiallyImmediate: this.constraint0()
      .generatedAlwaysAs0()
      .stored1()
      .initiallyImmediate0().$end,
    constraintGeneratedAlwaysAsIdentity: this.constraint0().generated0().always0().asIdentity0().$fn3,
    constraintGeneratedAlwaysAsIdentityDeferrableInitiallyDeferred: this.constraint0()
      .generated0()
      .always0()
      .asIdentity0()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintGeneratedAlwaysAsIdentityDeferrableInitiallyImmediate: this.constraint0()
      .generated0()
      .always0()
      .asIdentity0()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintGeneratedAlwaysAsIdentityNotDeferrableInitiallyDeferred: this.constraint0()
      .generated0()
      .always0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintGeneratedAlwaysAsIdentityNotDeferrableInitiallyImmediate: this.constraint0()
      .generated0()
      .always0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintGeneratedAlwaysAsIdentityInitiallyDeferred: this.constraint0()
      .generated0()
      .always0()
      .asIdentity0()
      .initiallyDeferred0().$end,
    constraintGeneratedAlwaysAsIdentityInitiallyImmediate: this.constraint0()
      .generated0()
      .always0()
      .asIdentity0()
      .initiallyImmediate0().$end,
    constraintGeneratedByDefaultAsIdentity: this.constraint0().generated0().byDefault0().asIdentity0().$fn3,
    constraintGeneratedByDefaultAsIdentityDeferrableInitiallyDeferred: this.constraint0()
      .generated0()
      .byDefault0()
      .asIdentity0()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintGeneratedByDefaultAsIdentityDeferrableInitiallyImmediate: this.constraint0()
      .generated0()
      .byDefault0()
      .asIdentity0()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintGeneratedByDefaultAsIdentityNotDeferrableInitiallyDeferred: this.constraint0()
      .generated0()
      .byDefault0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintGeneratedByDefaultAsIdentityNotDeferrableInitiallyImmediate: this.constraint0()
      .generated0()
      .byDefault0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintGeneratedByDefaultAsIdentityInitiallyDeferred: this.constraint0()
      .generated0()
      .byDefault0()
      .asIdentity0()
      .initiallyDeferred0().$end,
    constraintGeneratedByDefaultAsIdentityInitiallyImmediate: this.constraint0()
      .generated0()
      .byDefault0()
      .asIdentity0()
      .initiallyImmediate0().$end,
    constraintUniqueNullsNotDistinct: this.constraint0().unique0().nulls0().not0().distinct0().$fn4,
    constraintUniqueNullsNotDistinctDeferrableInitiallyDeferred: this.constraint0()
      .unique0()
      .nulls0()
      .not0()
      .distinct0()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintUniqueNullsNotDistinctDeferrableInitiallyImmediate: this.constraint0()
      .unique0()
      .nulls0()
      .not0()
      .distinct0()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintUniqueNullsNotDistinctNotDeferrableInitiallyDeferred: this.constraint0()
      .unique0()
      .nulls0()
      .not0()
      .distinct0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintUniqueNullsNotDistinctNotDeferrableInitiallyImmediate: this.constraint0()
      .unique0()
      .nulls0()
      .not0()
      .distinct0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintUniqueNullsNotDistinctInitiallyDeferred: this.constraint0()
      .unique0()
      .nulls0()
      .not0()
      .distinct0()
      .initiallyDeferred0().$end,
    constraintUniqueNullsNotDistinctInitiallyImmediate: this.constraint0()
      .unique0()
      .nulls0()
      .not0()
      .distinct0()
      .initiallyImmediate0().$end,
    constraintUniqueNullsDistinct: this.constraint0().unique0().nulls0().distinct0().$fn4,
    constraintUniqueNullsDistinctDeferrableInitiallyDeferred: this.constraint0()
      .unique0()
      .nulls0()
      .distinct0()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintUniqueNullsDistinctDeferrableInitiallyImmediate: this.constraint0()
      .unique0()
      .nulls0()
      .distinct0()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintUniqueNullsDistinctNotDeferrableInitiallyDeferred: this.constraint0()
      .unique0()
      .nulls0()
      .distinct0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintUniqueNullsDistinctNotDeferrableInitiallyImmediate: this.constraint0()
      .unique0()
      .nulls0()
      .distinct0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintUniqueNullsDistinctInitiallyDeferred: this.constraint0()
      .unique0()
      .nulls0()
      .distinct0()
      .initiallyDeferred0().$end,
    constraintUniqueNullsDistinctInitiallyImmediate: this.constraint0()
      .unique0()
      .nulls0()
      .distinct0()
      .initiallyImmediate0().$end,
    constraintUnique: this.constraint0().unique0().$fn4,
    constraintUniqueDeferrableInitiallyDeferred: this.constraint0().unique0().deferrable0().initiallyDeferred0().$end,
    constraintUniqueDeferrableInitiallyImmediate: this.constraint0().unique0().deferrable0().initiallyImmediate0().$end,
    constraintUniqueNotDeferrableInitiallyDeferred: this.constraint0().unique0().notDeferrable0().initiallyDeferred0()
      .$end,
    constraintUniqueNotDeferrableInitiallyImmediate: this.constraint0().unique0().notDeferrable0().initiallyImmediate0()
      .$end,
    constraintUniqueInitiallyDeferred: this.constraint0().unique0().initiallyDeferred0().$end,
    constraintUniqueInitiallyImmediate: this.constraint0().unique0().initiallyImmediate0().$end,
    constraintPrimaryKey: this.constraint0().primaryKey0().$fn5,
    constraintPrimaryKeyDeferrableInitiallyDeferred: this.constraint0().primaryKey0().deferrable0().initiallyDeferred0()
      .$end,
    constraintPrimaryKeyDeferrableInitiallyImmediate: this.constraint0()
      .primaryKey0()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintPrimaryKeyNotDeferrableInitiallyDeferred: this.constraint0()
      .primaryKey0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintPrimaryKeyNotDeferrableInitiallyImmediate: this.constraint0()
      .primaryKey0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintPrimaryKeyInitiallyDeferred: this.constraint0().primaryKey0().initiallyDeferred0().$end,
    constraintPrimaryKeyInitiallyImmediate: this.constraint0().primaryKey0().initiallyImmediate0().$end,
    constraintReferences: this.constraint0().references0().$fn11,
    constraintReferencesMatchFullOnDelete: this.constraint0().references0().matchFull2().onDelete2().$fn13,
    constraintReferencesMatchFullOnDeleteOnUpdate: this.constraint0().references0().matchFull2().onDelete2().onUpdate2()
      .$fn12,
    constraintReferencesMatchFullOnDeleteOnUpdateDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullOnDeleteOnUpdateDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullOnDeleteOnUpdateInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullOnDeleteOnUpdateInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullOnDeleteDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullOnDeleteDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullOnDeleteNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullOnDeleteNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullOnDeleteInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullOnDeleteInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .onDelete2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullOnUpdate: this.constraint0().references0().matchFull2().onUpdate2().$fn12,
    constraintReferencesMatchFullOnUpdateDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullOnUpdateDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullOnUpdateNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullOnUpdateNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullOnUpdateInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullOnUpdateInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchFull2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchFullNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchFull2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchFullInitiallyDeferred: this.constraint0().references0().matchFull2().initiallyDeferred0()
      .$end,
    constraintReferencesMatchFullInitiallyImmediate: this.constraint0().references0().matchFull2().initiallyImmediate0()
      .$end,
    constraintReferencesMatchPartialOnDelete: this.constraint0().references0().matchPartial2().onDelete2().$fn13,
    constraintReferencesMatchPartialOnDeleteOnUpdate: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2().$fn12,
    constraintReferencesMatchPartialOnDeleteOnUpdateDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialOnDeleteOnUpdateDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialOnDeleteOnUpdateInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialOnDeleteOnUpdateInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialOnDeleteDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialOnDeleteDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialOnDeleteNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialOnDeleteNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialOnDeleteInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialOnDeleteInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .onDelete2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialOnUpdate: this.constraint0().references0().matchPartial2().onUpdate2().$fn12,
    constraintReferencesMatchPartialOnUpdateDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialOnUpdateDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialOnUpdateNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialOnUpdateNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialOnUpdateInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialOnUpdateInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchPartialInitiallyDeferred: this.constraint0()
      .references0()
      .matchPartial2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchPartialInitiallyImmediate: this.constraint0()
      .references0()
      .matchPartial2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleOnDelete: this.constraint0().references0().matchSimple2().onDelete2().$fn13,
    constraintReferencesMatchSimpleOnDeleteOnUpdate: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2().$fn12,
    constraintReferencesMatchSimpleOnDeleteOnUpdateDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleOnDeleteOnUpdateDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleOnDeleteOnUpdateInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleOnDeleteOnUpdateInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleOnDeleteDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleOnDeleteDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleOnDeleteNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleOnDeleteNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleOnDeleteInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleOnDeleteInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .onDelete2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleOnUpdate: this.constraint0().references0().matchSimple2().onUpdate2().$fn12,
    constraintReferencesMatchSimpleOnUpdateDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleOnUpdateDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleOnUpdateNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleOnUpdateNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleOnUpdateInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleOnUpdateInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesMatchSimpleInitiallyDeferred: this.constraint0()
      .references0()
      .matchSimple2()
      .initiallyDeferred0().$end,
    constraintReferencesMatchSimpleInitiallyImmediate: this.constraint0()
      .references0()
      .matchSimple2()
      .initiallyImmediate0().$end,
    constraintReferencesOnDelete: this.constraint0().references0().onDelete2().$fn13,
    constraintReferencesOnDeleteOnUpdate: this.constraint0().references0().onDelete2().onUpdate2().$fn12,
    constraintReferencesOnDeleteOnUpdateDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesOnDeleteOnUpdateDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesOnDeleteOnUpdateInitiallyDeferred: this.constraint0()
      .references0()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    constraintReferencesOnDeleteOnUpdateInitiallyImmediate: this.constraint0()
      .references0()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    constraintReferencesOnDeleteDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesOnDeleteDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesOnDeleteNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesOnDeleteNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesOnDeleteInitiallyDeferred: this.constraint0().references0().onDelete2().initiallyDeferred0()
      .$end,
    constraintReferencesOnDeleteInitiallyImmediate: this.constraint0().references0().onDelete2().initiallyImmediate0()
      .$end,
    constraintReferencesOnUpdate: this.constraint0().references0().onUpdate2().$fn12,
    constraintReferencesOnUpdateDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesOnUpdateDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesOnUpdateNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesOnUpdateNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesOnUpdateInitiallyDeferred: this.constraint0().references0().onUpdate2().initiallyDeferred0()
      .$end,
    constraintReferencesOnUpdateInitiallyImmediate: this.constraint0().references0().onUpdate2().initiallyImmediate0()
      .$end,
    constraintReferencesDeferrableInitiallyDeferred: this.constraint0().references0().deferrable0().initiallyDeferred0()
      .$end,
    constraintReferencesDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .deferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesNotDeferrableInitiallyDeferred: this.constraint0()
      .references0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    constraintReferencesNotDeferrableInitiallyImmediate: this.constraint0()
      .references0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    constraintReferencesInitiallyDeferred: this.constraint0().references0().initiallyDeferred0().$end,
    constraintReferencesInitiallyImmediate: this.constraint0().references0().initiallyImmediate0().$end,
    notNullDeferrableInitiallyDeferred: this.notNull0().deferrable0().initiallyDeferred0().$end,
    notNullDeferrableInitiallyImmediate: this.notNull0().deferrable0().initiallyImmediate0().$end,
    notNullNotDeferrableInitiallyDeferred: this.notNull0().notDeferrable0().initiallyDeferred0().$end,
    notNullNotDeferrableInitiallyImmediate: this.notNull0().notDeferrable0().initiallyImmediate0().$end,
    notNullInitiallyDeferred: this.notNull0().initiallyDeferred0().$end,
    notNullInitiallyImmediate: this.notNull0().initiallyImmediate0().$end,
    nullDeferrableInitiallyDeferred: this.null0().deferrable0().initiallyDeferred0().$end,
    nullDeferrableInitiallyImmediate: this.null0().deferrable0().initiallyImmediate0().$end,
    nullNotDeferrableInitiallyDeferred: this.null0().notDeferrable0().initiallyDeferred0().$end,
    nullNotDeferrableInitiallyImmediate: this.null0().notDeferrable0().initiallyImmediate0().$end,
    nullInitiallyDeferred: this.null0().initiallyDeferred0().$end,
    nullInitiallyImmediate: this.null0().initiallyImmediate0().$end,
    check: this.check0().$fn0,
    checkNoInheritDeferrableInitiallyDeferred: this.check0().noInherit1().deferrable0().initiallyDeferred0().$end,
    checkNoInheritDeferrableInitiallyImmediate: this.check0().noInherit1().deferrable0().initiallyImmediate0().$end,
    checkNoInheritNotDeferrableInitiallyDeferred: this.check0().noInherit1().notDeferrable0().initiallyDeferred0().$end,
    checkNoInheritNotDeferrableInitiallyImmediate: this.check0().noInherit1().notDeferrable0().initiallyImmediate0()
      .$end,
    checkNoInheritInitiallyDeferred: this.check0().noInherit1().initiallyDeferred0().$end,
    checkNoInheritInitiallyImmediate: this.check0().noInherit1().initiallyImmediate0().$end,
    checkDeferrableInitiallyDeferred: this.check0().deferrable0().initiallyDeferred0().$end,
    checkDeferrableInitiallyImmediate: this.check0().deferrable0().initiallyImmediate0().$end,
    checkNotDeferrableInitiallyDeferred: this.check0().notDeferrable0().initiallyDeferred0().$end,
    checkNotDeferrableInitiallyImmediate: this.check0().notDeferrable0().initiallyImmediate0().$end,
    checkInitiallyDeferred: this.check0().initiallyDeferred0().$end,
    checkInitiallyImmediate: this.check0().initiallyImmediate0().$end,
    default: this.default0().$fn1,
    defaultDeferrableInitiallyDeferred: this.default0().deferrable0().initiallyDeferred0().$end,
    defaultDeferrableInitiallyImmediate: this.default0().deferrable0().initiallyImmediate0().$end,
    defaultNotDeferrableInitiallyDeferred: this.default0().notDeferrable0().initiallyDeferred0().$end,
    defaultNotDeferrableInitiallyImmediate: this.default0().notDeferrable0().initiallyImmediate0().$end,
    defaultInitiallyDeferred: this.default0().initiallyDeferred0().$end,
    defaultInitiallyImmediate: this.default0().initiallyImmediate0().$end,
    generatedAlwaysAs: this.generatedAlwaysAs0().$fn2,
    generatedAlwaysAsStoredDeferrableInitiallyDeferred: this.generatedAlwaysAs0()
      .stored1()
      .deferrable0()
      .initiallyDeferred0().$end,
    generatedAlwaysAsStoredDeferrableInitiallyImmediate: this.generatedAlwaysAs0()
      .stored1()
      .deferrable0()
      .initiallyImmediate0().$end,
    generatedAlwaysAsStoredNotDeferrableInitiallyDeferred: this.generatedAlwaysAs0()
      .stored1()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    generatedAlwaysAsStoredNotDeferrableInitiallyImmediate: this.generatedAlwaysAs0()
      .stored1()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    generatedAlwaysAsStoredInitiallyDeferred: this.generatedAlwaysAs0().stored1().initiallyDeferred0().$end,
    generatedAlwaysAsStoredInitiallyImmediate: this.generatedAlwaysAs0().stored1().initiallyImmediate0().$end,
    generatedAlwaysAsIdentity: this.generated0().always0().asIdentity0().$fn3,
    generatedAlwaysAsIdentityDeferrableInitiallyDeferred: this.generated0()
      .always0()
      .asIdentity0()
      .deferrable0()
      .initiallyDeferred0().$end,
    generatedAlwaysAsIdentityDeferrableInitiallyImmediate: this.generated0()
      .always0()
      .asIdentity0()
      .deferrable0()
      .initiallyImmediate0().$end,
    generatedAlwaysAsIdentityNotDeferrableInitiallyDeferred: this.generated0()
      .always0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    generatedAlwaysAsIdentityNotDeferrableInitiallyImmediate: this.generated0()
      .always0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    generatedAlwaysAsIdentityInitiallyDeferred: this.generated0().always0().asIdentity0().initiallyDeferred0().$end,
    generatedAlwaysAsIdentityInitiallyImmediate: this.generated0().always0().asIdentity0().initiallyImmediate0().$end,
    generatedByDefaultAsIdentity: this.generated0().byDefault0().asIdentity0().$fn3,
    generatedByDefaultAsIdentityDeferrableInitiallyDeferred: this.generated0()
      .byDefault0()
      .asIdentity0()
      .deferrable0()
      .initiallyDeferred0().$end,
    generatedByDefaultAsIdentityDeferrableInitiallyImmediate: this.generated0()
      .byDefault0()
      .asIdentity0()
      .deferrable0()
      .initiallyImmediate0().$end,
    generatedByDefaultAsIdentityNotDeferrableInitiallyDeferred: this.generated0()
      .byDefault0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    generatedByDefaultAsIdentityNotDeferrableInitiallyImmediate: this.generated0()
      .byDefault0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    generatedByDefaultAsIdentityInitiallyDeferred: this.generated0().byDefault0().asIdentity0().initiallyDeferred0()
      .$end,
    generatedByDefaultAsIdentityInitiallyImmediate: this.generated0().byDefault0().asIdentity0().initiallyImmediate0()
      .$end,
    uniqueNullsNotDistinct: this.unique0().nulls0().not0().distinct0().$fn4,
    uniqueNullsNotDistinctDeferrableInitiallyDeferred: this.unique0()
      .nulls0()
      .not0()
      .distinct0()
      .deferrable0()
      .initiallyDeferred0().$end,
    uniqueNullsNotDistinctDeferrableInitiallyImmediate: this.unique0()
      .nulls0()
      .not0()
      .distinct0()
      .deferrable0()
      .initiallyImmediate0().$end,
    uniqueNullsNotDistinctNotDeferrableInitiallyDeferred: this.unique0()
      .nulls0()
      .not0()
      .distinct0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    uniqueNullsNotDistinctNotDeferrableInitiallyImmediate: this.unique0()
      .nulls0()
      .not0()
      .distinct0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    uniqueNullsNotDistinctInitiallyDeferred: this.unique0().nulls0().not0().distinct0().initiallyDeferred0().$end,
    uniqueNullsNotDistinctInitiallyImmediate: this.unique0().nulls0().not0().distinct0().initiallyImmediate0().$end,
    uniqueNullsDistinct: this.unique0().nulls0().distinct0().$fn4,
    uniqueNullsDistinctDeferrableInitiallyDeferred: this.unique0()
      .nulls0()
      .distinct0()
      .deferrable0()
      .initiallyDeferred0().$end,
    uniqueNullsDistinctDeferrableInitiallyImmediate: this.unique0()
      .nulls0()
      .distinct0()
      .deferrable0()
      .initiallyImmediate0().$end,
    uniqueNullsDistinctNotDeferrableInitiallyDeferred: this.unique0()
      .nulls0()
      .distinct0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    uniqueNullsDistinctNotDeferrableInitiallyImmediate: this.unique0()
      .nulls0()
      .distinct0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    uniqueNullsDistinctInitiallyDeferred: this.unique0().nulls0().distinct0().initiallyDeferred0().$end,
    uniqueNullsDistinctInitiallyImmediate: this.unique0().nulls0().distinct0().initiallyImmediate0().$end,
    unique: this.unique0().$fn4,
    uniqueDeferrableInitiallyDeferred: this.unique0().deferrable0().initiallyDeferred0().$end,
    uniqueDeferrableInitiallyImmediate: this.unique0().deferrable0().initiallyImmediate0().$end,
    uniqueNotDeferrableInitiallyDeferred: this.unique0().notDeferrable0().initiallyDeferred0().$end,
    uniqueNotDeferrableInitiallyImmediate: this.unique0().notDeferrable0().initiallyImmediate0().$end,
    uniqueInitiallyDeferred: this.unique0().initiallyDeferred0().$end,
    uniqueInitiallyImmediate: this.unique0().initiallyImmediate0().$end,
    primaryKey: this.primaryKey0().$fn5,
    primaryKeyDeferrableInitiallyDeferred: this.primaryKey0().deferrable0().initiallyDeferred0().$end,
    primaryKeyDeferrableInitiallyImmediate: this.primaryKey0().deferrable0().initiallyImmediate0().$end,
    primaryKeyNotDeferrableInitiallyDeferred: this.primaryKey0().notDeferrable0().initiallyDeferred0().$end,
    primaryKeyNotDeferrableInitiallyImmediate: this.primaryKey0().notDeferrable0().initiallyImmediate0().$end,
    primaryKeyInitiallyDeferred: this.primaryKey0().initiallyDeferred0().$end,
    primaryKeyInitiallyImmediate: this.primaryKey0().initiallyImmediate0().$end,
    references: this.references0().$fn11,
    referencesMatchFullOnDelete: this.references0().matchFull2().onDelete2().$fn13,
    referencesMatchFullOnDeleteOnUpdate: this.references0().matchFull2().onDelete2().onUpdate2().$fn12,
    referencesMatchFullOnDeleteOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteOnUpdateInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteOnUpdateInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteNotDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteNotDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteInitiallyDeferred: this.references0().matchFull2().onDelete2().initiallyDeferred0().$end,
    referencesMatchFullOnDeleteInitiallyImmediate: this.references0().matchFull2().onDelete2().initiallyImmediate0()
      .$end,
    referencesMatchFullOnUpdate: this.references0().matchFull2().onUpdate2().$fn12,
    referencesMatchFullOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnUpdateInitiallyDeferred: this.references0().matchFull2().onUpdate2().initiallyDeferred0().$end,
    referencesMatchFullOnUpdateInitiallyImmediate: this.references0().matchFull2().onUpdate2().initiallyImmediate0()
      .$end,
    referencesMatchFullDeferrableInitiallyDeferred: this.references0().matchFull2().deferrable0().initiallyDeferred0()
      .$end,
    referencesMatchFullDeferrableInitiallyImmediate: this.references0().matchFull2().deferrable0().initiallyImmediate0()
      .$end,
    referencesMatchFullNotDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullNotDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullInitiallyDeferred: this.references0().matchFull2().initiallyDeferred0().$end,
    referencesMatchFullInitiallyImmediate: this.references0().matchFull2().initiallyImmediate0().$end,
    referencesMatchPartialOnDelete: this.references0().matchPartial2().onDelete2().$fn13,
    referencesMatchPartialOnDeleteOnUpdate: this.references0().matchPartial2().onDelete2().onUpdate2().$fn12,
    referencesMatchPartialOnDeleteOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteOnUpdateInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteOnUpdateInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteNotDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteNotDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteInitiallyDeferred: this.references0().matchPartial2().onDelete2().initiallyDeferred0()
      .$end,
    referencesMatchPartialOnDeleteInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnUpdate: this.references0().matchPartial2().onUpdate2().$fn12,
    referencesMatchPartialOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnUpdateInitiallyDeferred: this.references0().matchPartial2().onUpdate2().initiallyDeferred0()
      .$end,
    referencesMatchPartialOnUpdateInitiallyImmediate: this.references0()
      .matchPartial2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    referencesMatchPartialDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialNotDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialNotDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialInitiallyDeferred: this.references0().matchPartial2().initiallyDeferred0().$end,
    referencesMatchPartialInitiallyImmediate: this.references0().matchPartial2().initiallyImmediate0().$end,
    referencesMatchSimpleOnDelete: this.references0().matchSimple2().onDelete2().$fn13,
    referencesMatchSimpleOnDeleteOnUpdate: this.references0().matchSimple2().onDelete2().onUpdate2().$fn12,
    referencesMatchSimpleOnDeleteOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteOnUpdateInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteOnUpdateInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteNotDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteNotDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteInitiallyDeferred: this.references0().matchSimple2().onDelete2().initiallyDeferred0()
      .$end,
    referencesMatchSimpleOnDeleteInitiallyImmediate: this.references0().matchSimple2().onDelete2().initiallyImmediate0()
      .$end,
    referencesMatchSimpleOnUpdate: this.references0().matchSimple2().onUpdate2().$fn12,
    referencesMatchSimpleOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnUpdateInitiallyDeferred: this.references0().matchSimple2().onUpdate2().initiallyDeferred0()
      .$end,
    referencesMatchSimpleOnUpdateInitiallyImmediate: this.references0().matchSimple2().onUpdate2().initiallyImmediate0()
      .$end,
    referencesMatchSimpleDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleNotDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleNotDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleInitiallyDeferred: this.references0().matchSimple2().initiallyDeferred0().$end,
    referencesMatchSimpleInitiallyImmediate: this.references0().matchSimple2().initiallyImmediate0().$end,
    referencesOnDelete: this.references0().onDelete2().$fn13,
    referencesOnDeleteOnUpdate: this.references0().onDelete2().onUpdate2().$fn12,
    referencesOnDeleteOnUpdateDeferrableInitiallyDeferred: this.references0()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesOnDeleteOnUpdateDeferrableInitiallyImmediate: this.references0()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesOnDeleteOnUpdateInitiallyDeferred: this.references0().onDelete2().onUpdate2().initiallyDeferred0().$end,
    referencesOnDeleteOnUpdateInitiallyImmediate: this.references0().onDelete2().onUpdate2().initiallyImmediate0().$end,
    referencesOnDeleteDeferrableInitiallyDeferred: this.references0().onDelete2().deferrable0().initiallyDeferred0()
      .$end,
    referencesOnDeleteDeferrableInitiallyImmediate: this.references0().onDelete2().deferrable0().initiallyImmediate0()
      .$end,
    referencesOnDeleteNotDeferrableInitiallyDeferred: this.references0()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesOnDeleteNotDeferrableInitiallyImmediate: this.references0()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesOnDeleteInitiallyDeferred: this.references0().onDelete2().initiallyDeferred0().$end,
    referencesOnDeleteInitiallyImmediate: this.references0().onDelete2().initiallyImmediate0().$end,
    referencesOnUpdate: this.references0().onUpdate2().$fn12,
    referencesOnUpdateDeferrableInitiallyDeferred: this.references0().onUpdate2().deferrable0().initiallyDeferred0()
      .$end,
    referencesOnUpdateDeferrableInitiallyImmediate: this.references0().onUpdate2().deferrable0().initiallyImmediate0()
      .$end,
    referencesOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesOnUpdateInitiallyDeferred: this.references0().onUpdate2().initiallyDeferred0().$end,
    referencesOnUpdateInitiallyImmediate: this.references0().onUpdate2().initiallyImmediate0().$end,
    referencesDeferrableInitiallyDeferred: this.references0().deferrable0().initiallyDeferred0().$end,
    referencesDeferrableInitiallyImmediate: this.references0().deferrable0().initiallyImmediate0().$end,
    referencesNotDeferrableInitiallyDeferred: this.references0().notDeferrable0().initiallyDeferred0().$end,
    referencesNotDeferrableInitiallyImmediate: this.references0().notDeferrable0().initiallyImmediate0().$end,
    referencesInitiallyDeferred: this.references0().initiallyDeferred0().$end,
    referencesInitiallyImmediate: this.references0().initiallyImmediate0().$end,
  });
  constraint0 = () => this;
  notNull0 = () => this;
  deferrable0 = () => this;
  initiallyDeferred0 = () => this;
  initiallyImmediate0 = () => this;
  notDeferrable0 = () => this;
  null0 = () => this;
  check0 = () => this;
  noInherit1 = () => this;
  default0 = () => this;
  generatedAlwaysAs0 = () => this;
  stored1 = () => this;
  generated0 = () => this;
  always0 = () => this;
  asIdentity0 = () => this;
  byDefault0 = () => this;
  unique0 = () => this;
  nulls0 = () => this;
  not0 = () => this;
  distinct0 = () => this;
  primaryKey0 = () => this;
  references0 = () => this;
  matchFull2 = () => this;
  onDelete2 = () => this;
  onUpdate2 = () => this;
  matchPartial2 = () => this;
  matchSimple2 = () => this;
  $fn14 = (constraint_name: Raw) => ({
    notNullDeferrableInitiallyDeferred: this.notNull0().deferrable0().initiallyDeferred0().$end,
    notNullDeferrableInitiallyImmediate: this.notNull0().deferrable0().initiallyImmediate0().$end,
    notNullNotDeferrableInitiallyDeferred: this.notNull0().notDeferrable0().initiallyDeferred0().$end,
    notNullNotDeferrableInitiallyImmediate: this.notNull0().notDeferrable0().initiallyImmediate0().$end,
    notNullInitiallyDeferred: this.notNull0().initiallyDeferred0().$end,
    notNullInitiallyImmediate: this.notNull0().initiallyImmediate0().$end,
    nullDeferrableInitiallyDeferred: this.null0().deferrable0().initiallyDeferred0().$end,
    nullDeferrableInitiallyImmediate: this.null0().deferrable0().initiallyImmediate0().$end,
    nullNotDeferrableInitiallyDeferred: this.null0().notDeferrable0().initiallyDeferred0().$end,
    nullNotDeferrableInitiallyImmediate: this.null0().notDeferrable0().initiallyImmediate0().$end,
    nullInitiallyDeferred: this.null0().initiallyDeferred0().$end,
    nullInitiallyImmediate: this.null0().initiallyImmediate0().$end,
    check: this.check0().$fn0,
    checkNoInheritDeferrableInitiallyDeferred: this.check0().noInherit1().deferrable0().initiallyDeferred0().$end,
    checkNoInheritDeferrableInitiallyImmediate: this.check0().noInherit1().deferrable0().initiallyImmediate0().$end,
    checkNoInheritNotDeferrableInitiallyDeferred: this.check0().noInherit1().notDeferrable0().initiallyDeferred0().$end,
    checkNoInheritNotDeferrableInitiallyImmediate: this.check0().noInherit1().notDeferrable0().initiallyImmediate0()
      .$end,
    checkNoInheritInitiallyDeferred: this.check0().noInherit1().initiallyDeferred0().$end,
    checkNoInheritInitiallyImmediate: this.check0().noInherit1().initiallyImmediate0().$end,
    checkDeferrableInitiallyDeferred: this.check0().deferrable0().initiallyDeferred0().$end,
    checkDeferrableInitiallyImmediate: this.check0().deferrable0().initiallyImmediate0().$end,
    checkNotDeferrableInitiallyDeferred: this.check0().notDeferrable0().initiallyDeferred0().$end,
    checkNotDeferrableInitiallyImmediate: this.check0().notDeferrable0().initiallyImmediate0().$end,
    checkInitiallyDeferred: this.check0().initiallyDeferred0().$end,
    checkInitiallyImmediate: this.check0().initiallyImmediate0().$end,
    default: this.default0().$fn1,
    defaultDeferrableInitiallyDeferred: this.default0().deferrable0().initiallyDeferred0().$end,
    defaultDeferrableInitiallyImmediate: this.default0().deferrable0().initiallyImmediate0().$end,
    defaultNotDeferrableInitiallyDeferred: this.default0().notDeferrable0().initiallyDeferred0().$end,
    defaultNotDeferrableInitiallyImmediate: this.default0().notDeferrable0().initiallyImmediate0().$end,
    defaultInitiallyDeferred: this.default0().initiallyDeferred0().$end,
    defaultInitiallyImmediate: this.default0().initiallyImmediate0().$end,
    generatedAlwaysAs: this.generatedAlwaysAs0().$fn2,
    generatedAlwaysAsStoredDeferrableInitiallyDeferred: this.generatedAlwaysAs0()
      .stored1()
      .deferrable0()
      .initiallyDeferred0().$end,
    generatedAlwaysAsStoredDeferrableInitiallyImmediate: this.generatedAlwaysAs0()
      .stored1()
      .deferrable0()
      .initiallyImmediate0().$end,
    generatedAlwaysAsStoredNotDeferrableInitiallyDeferred: this.generatedAlwaysAs0()
      .stored1()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    generatedAlwaysAsStoredNotDeferrableInitiallyImmediate: this.generatedAlwaysAs0()
      .stored1()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    generatedAlwaysAsStoredInitiallyDeferred: this.generatedAlwaysAs0().stored1().initiallyDeferred0().$end,
    generatedAlwaysAsStoredInitiallyImmediate: this.generatedAlwaysAs0().stored1().initiallyImmediate0().$end,
    generatedAlwaysAsIdentity: this.generated0().always0().asIdentity0().$fn3,
    generatedAlwaysAsIdentityDeferrableInitiallyDeferred: this.generated0()
      .always0()
      .asIdentity0()
      .deferrable0()
      .initiallyDeferred0().$end,
    generatedAlwaysAsIdentityDeferrableInitiallyImmediate: this.generated0()
      .always0()
      .asIdentity0()
      .deferrable0()
      .initiallyImmediate0().$end,
    generatedAlwaysAsIdentityNotDeferrableInitiallyDeferred: this.generated0()
      .always0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    generatedAlwaysAsIdentityNotDeferrableInitiallyImmediate: this.generated0()
      .always0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    generatedAlwaysAsIdentityInitiallyDeferred: this.generated0().always0().asIdentity0().initiallyDeferred0().$end,
    generatedAlwaysAsIdentityInitiallyImmediate: this.generated0().always0().asIdentity0().initiallyImmediate0().$end,
    generatedByDefaultAsIdentity: this.generated0().byDefault0().asIdentity0().$fn3,
    generatedByDefaultAsIdentityDeferrableInitiallyDeferred: this.generated0()
      .byDefault0()
      .asIdentity0()
      .deferrable0()
      .initiallyDeferred0().$end,
    generatedByDefaultAsIdentityDeferrableInitiallyImmediate: this.generated0()
      .byDefault0()
      .asIdentity0()
      .deferrable0()
      .initiallyImmediate0().$end,
    generatedByDefaultAsIdentityNotDeferrableInitiallyDeferred: this.generated0()
      .byDefault0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    generatedByDefaultAsIdentityNotDeferrableInitiallyImmediate: this.generated0()
      .byDefault0()
      .asIdentity0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    generatedByDefaultAsIdentityInitiallyDeferred: this.generated0().byDefault0().asIdentity0().initiallyDeferred0()
      .$end,
    generatedByDefaultAsIdentityInitiallyImmediate: this.generated0().byDefault0().asIdentity0().initiallyImmediate0()
      .$end,
    uniqueNullsNotDistinct: this.unique0().nulls0().not0().distinct0().$fn4,
    uniqueNullsNotDistinctDeferrableInitiallyDeferred: this.unique0()
      .nulls0()
      .not0()
      .distinct0()
      .deferrable0()
      .initiallyDeferred0().$end,
    uniqueNullsNotDistinctDeferrableInitiallyImmediate: this.unique0()
      .nulls0()
      .not0()
      .distinct0()
      .deferrable0()
      .initiallyImmediate0().$end,
    uniqueNullsNotDistinctNotDeferrableInitiallyDeferred: this.unique0()
      .nulls0()
      .not0()
      .distinct0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    uniqueNullsNotDistinctNotDeferrableInitiallyImmediate: this.unique0()
      .nulls0()
      .not0()
      .distinct0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    uniqueNullsNotDistinctInitiallyDeferred: this.unique0().nulls0().not0().distinct0().initiallyDeferred0().$end,
    uniqueNullsNotDistinctInitiallyImmediate: this.unique0().nulls0().not0().distinct0().initiallyImmediate0().$end,
    uniqueNullsDistinct: this.unique0().nulls0().distinct0().$fn4,
    uniqueNullsDistinctDeferrableInitiallyDeferred: this.unique0()
      .nulls0()
      .distinct0()
      .deferrable0()
      .initiallyDeferred0().$end,
    uniqueNullsDistinctDeferrableInitiallyImmediate: this.unique0()
      .nulls0()
      .distinct0()
      .deferrable0()
      .initiallyImmediate0().$end,
    uniqueNullsDistinctNotDeferrableInitiallyDeferred: this.unique0()
      .nulls0()
      .distinct0()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    uniqueNullsDistinctNotDeferrableInitiallyImmediate: this.unique0()
      .nulls0()
      .distinct0()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    uniqueNullsDistinctInitiallyDeferred: this.unique0().nulls0().distinct0().initiallyDeferred0().$end,
    uniqueNullsDistinctInitiallyImmediate: this.unique0().nulls0().distinct0().initiallyImmediate0().$end,
    unique: this.unique0().$fn4,
    uniqueDeferrableInitiallyDeferred: this.unique0().deferrable0().initiallyDeferred0().$end,
    uniqueDeferrableInitiallyImmediate: this.unique0().deferrable0().initiallyImmediate0().$end,
    uniqueNotDeferrableInitiallyDeferred: this.unique0().notDeferrable0().initiallyDeferred0().$end,
    uniqueNotDeferrableInitiallyImmediate: this.unique0().notDeferrable0().initiallyImmediate0().$end,
    uniqueInitiallyDeferred: this.unique0().initiallyDeferred0().$end,
    uniqueInitiallyImmediate: this.unique0().initiallyImmediate0().$end,
    primaryKey: this.primaryKey0().$fn5,
    primaryKeyDeferrableInitiallyDeferred: this.primaryKey0().deferrable0().initiallyDeferred0().$end,
    primaryKeyDeferrableInitiallyImmediate: this.primaryKey0().deferrable0().initiallyImmediate0().$end,
    primaryKeyNotDeferrableInitiallyDeferred: this.primaryKey0().notDeferrable0().initiallyDeferred0().$end,
    primaryKeyNotDeferrableInitiallyImmediate: this.primaryKey0().notDeferrable0().initiallyImmediate0().$end,
    primaryKeyInitiallyDeferred: this.primaryKey0().initiallyDeferred0().$end,
    primaryKeyInitiallyImmediate: this.primaryKey0().initiallyImmediate0().$end,
    references: this.references0().$fn11,
    referencesMatchFullOnDelete: this.references0().matchFull2().onDelete2().$fn13,
    referencesMatchFullOnDeleteOnUpdate: this.references0().matchFull2().onDelete2().onUpdate2().$fn12,
    referencesMatchFullOnDeleteOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteOnUpdateInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteOnUpdateInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteNotDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnDeleteNotDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnDeleteInitiallyDeferred: this.references0().matchFull2().onDelete2().initiallyDeferred0().$end,
    referencesMatchFullOnDeleteInitiallyImmediate: this.references0().matchFull2().onDelete2().initiallyImmediate0()
      .$end,
    referencesMatchFullOnUpdate: this.references0().matchFull2().onUpdate2().$fn12,
    referencesMatchFullOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullOnUpdateInitiallyDeferred: this.references0().matchFull2().onUpdate2().initiallyDeferred0().$end,
    referencesMatchFullOnUpdateInitiallyImmediate: this.references0().matchFull2().onUpdate2().initiallyImmediate0()
      .$end,
    referencesMatchFullDeferrableInitiallyDeferred: this.references0().matchFull2().deferrable0().initiallyDeferred0()
      .$end,
    referencesMatchFullDeferrableInitiallyImmediate: this.references0().matchFull2().deferrable0().initiallyImmediate0()
      .$end,
    referencesMatchFullNotDeferrableInitiallyDeferred: this.references0()
      .matchFull2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchFullNotDeferrableInitiallyImmediate: this.references0()
      .matchFull2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchFullInitiallyDeferred: this.references0().matchFull2().initiallyDeferred0().$end,
    referencesMatchFullInitiallyImmediate: this.references0().matchFull2().initiallyImmediate0().$end,
    referencesMatchPartialOnDelete: this.references0().matchPartial2().onDelete2().$fn13,
    referencesMatchPartialOnDeleteOnUpdate: this.references0().matchPartial2().onDelete2().onUpdate2().$fn12,
    referencesMatchPartialOnDeleteOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteOnUpdateInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteOnUpdateInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteNotDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnDeleteNotDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnDeleteInitiallyDeferred: this.references0().matchPartial2().onDelete2().initiallyDeferred0()
      .$end,
    referencesMatchPartialOnDeleteInitiallyImmediate: this.references0()
      .matchPartial2()
      .onDelete2()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnUpdate: this.references0().matchPartial2().onUpdate2().$fn12,
    referencesMatchPartialOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialOnUpdateInitiallyDeferred: this.references0().matchPartial2().onUpdate2().initiallyDeferred0()
      .$end,
    referencesMatchPartialOnUpdateInitiallyImmediate: this.references0()
      .matchPartial2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    referencesMatchPartialDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialNotDeferrableInitiallyDeferred: this.references0()
      .matchPartial2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchPartialNotDeferrableInitiallyImmediate: this.references0()
      .matchPartial2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchPartialInitiallyDeferred: this.references0().matchPartial2().initiallyDeferred0().$end,
    referencesMatchPartialInitiallyImmediate: this.references0().matchPartial2().initiallyImmediate0().$end,
    referencesMatchSimpleOnDelete: this.references0().matchSimple2().onDelete2().$fn13,
    referencesMatchSimpleOnDeleteOnUpdate: this.references0().matchSimple2().onDelete2().onUpdate2().$fn12,
    referencesMatchSimpleOnDeleteOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteOnUpdateInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteOnUpdateInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .onUpdate2()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteNotDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnDeleteNotDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnDeleteInitiallyDeferred: this.references0().matchSimple2().onDelete2().initiallyDeferred0()
      .$end,
    referencesMatchSimpleOnDeleteInitiallyImmediate: this.references0().matchSimple2().onDelete2().initiallyImmediate0()
      .$end,
    referencesMatchSimpleOnUpdate: this.references0().matchSimple2().onUpdate2().$fn12,
    referencesMatchSimpleOnUpdateDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnUpdateDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleOnUpdateInitiallyDeferred: this.references0().matchSimple2().onUpdate2().initiallyDeferred0()
      .$end,
    referencesMatchSimpleOnUpdateInitiallyImmediate: this.references0().matchSimple2().onUpdate2().initiallyImmediate0()
      .$end,
    referencesMatchSimpleDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleNotDeferrableInitiallyDeferred: this.references0()
      .matchSimple2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesMatchSimpleNotDeferrableInitiallyImmediate: this.references0()
      .matchSimple2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesMatchSimpleInitiallyDeferred: this.references0().matchSimple2().initiallyDeferred0().$end,
    referencesMatchSimpleInitiallyImmediate: this.references0().matchSimple2().initiallyImmediate0().$end,
    referencesOnDelete: this.references0().onDelete2().$fn13,
    referencesOnDeleteOnUpdate: this.references0().onDelete2().onUpdate2().$fn12,
    referencesOnDeleteOnUpdateDeferrableInitiallyDeferred: this.references0()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    referencesOnDeleteOnUpdateDeferrableInitiallyImmediate: this.references0()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    referencesOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesOnDeleteOnUpdateInitiallyDeferred: this.references0().onDelete2().onUpdate2().initiallyDeferred0().$end,
    referencesOnDeleteOnUpdateInitiallyImmediate: this.references0().onDelete2().onUpdate2().initiallyImmediate0().$end,
    referencesOnDeleteDeferrableInitiallyDeferred: this.references0().onDelete2().deferrable0().initiallyDeferred0()
      .$end,
    referencesOnDeleteDeferrableInitiallyImmediate: this.references0().onDelete2().deferrable0().initiallyImmediate0()
      .$end,
    referencesOnDeleteNotDeferrableInitiallyDeferred: this.references0()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesOnDeleteNotDeferrableInitiallyImmediate: this.references0()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesOnDeleteInitiallyDeferred: this.references0().onDelete2().initiallyDeferred0().$end,
    referencesOnDeleteInitiallyImmediate: this.references0().onDelete2().initiallyImmediate0().$end,
    referencesOnUpdate: this.references0().onUpdate2().$fn12,
    referencesOnUpdateDeferrableInitiallyDeferred: this.references0().onUpdate2().deferrable0().initiallyDeferred0()
      .$end,
    referencesOnUpdateDeferrableInitiallyImmediate: this.references0().onUpdate2().deferrable0().initiallyImmediate0()
      .$end,
    referencesOnUpdateNotDeferrableInitiallyDeferred: this.references0()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    referencesOnUpdateNotDeferrableInitiallyImmediate: this.references0()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    referencesOnUpdateInitiallyDeferred: this.references0().onUpdate2().initiallyDeferred0().$end,
    referencesOnUpdateInitiallyImmediate: this.references0().onUpdate2().initiallyImmediate0().$end,
    referencesDeferrableInitiallyDeferred: this.references0().deferrable0().initiallyDeferred0().$end,
    referencesDeferrableInitiallyImmediate: this.references0().deferrable0().initiallyImmediate0().$end,
    referencesNotDeferrableInitiallyDeferred: this.references0().notDeferrable0().initiallyDeferred0().$end,
    referencesNotDeferrableInitiallyImmediate: this.references0().notDeferrable0().initiallyImmediate0().$end,
    referencesInitiallyDeferred: this.references0().initiallyDeferred0().$end,
    referencesInitiallyImmediate: this.references0().initiallyImmediate0().$end,
  });
  $end = () => ({});
  $fn0 = (param0: Raw) => ({
    noInheritDeferrableInitiallyDeferred: this.noInherit1().deferrable0().initiallyDeferred0().$end,
    noInheritDeferrableInitiallyImmediate: this.noInherit1().deferrable0().initiallyImmediate0().$end,
    noInheritNotDeferrableInitiallyDeferred: this.noInherit1().notDeferrable0().initiallyDeferred0().$end,
    noInheritNotDeferrableInitiallyImmediate: this.noInherit1().notDeferrable0().initiallyImmediate0().$end,
    noInheritInitiallyDeferred: this.noInherit1().initiallyDeferred0().$end,
    noInheritInitiallyImmediate: this.noInherit1().initiallyImmediate0().$end,
    deferrableInitiallyDeferred: this.deferrable0().initiallyDeferred0().$end,
    deferrableInitiallyImmediate: this.deferrable0().initiallyImmediate0().$end,
    notDeferrableInitiallyDeferred: this.notDeferrable0().initiallyDeferred0().$end,
    notDeferrableInitiallyImmediate: this.notDeferrable0().initiallyImmediate0().$end,
    initiallyDeferred: this.initiallyDeferred0().$end,
    initiallyImmediate: this.initiallyImmediate0().$end,
  });
  $fn1 = (default_expr: Raw) => ({
    deferrableInitiallyDeferred: this.deferrable0().initiallyDeferred0().$end,
    deferrableInitiallyImmediate: this.deferrable0().initiallyImmediate0().$end,
    notDeferrableInitiallyDeferred: this.notDeferrable0().initiallyDeferred0().$end,
    notDeferrableInitiallyImmediate: this.notDeferrable0().initiallyImmediate0().$end,
    initiallyDeferred: this.initiallyDeferred0().$end,
    initiallyImmediate: this.initiallyImmediate0().$end,
  });
  $fn2 = (param0: Raw) => ({
    storedDeferrableInitiallyDeferred: this.stored1().deferrable0().initiallyDeferred0().$end,
    storedDeferrableInitiallyImmediate: this.stored1().deferrable0().initiallyImmediate0().$end,
    storedNotDeferrableInitiallyDeferred: this.stored1().notDeferrable0().initiallyDeferred0().$end,
    storedNotDeferrableInitiallyImmediate: this.stored1().notDeferrable0().initiallyImmediate0().$end,
    storedInitiallyDeferred: this.stored1().initiallyDeferred0().$end,
    storedInitiallyImmediate: this.stored1().initiallyImmediate0().$end,
  });
  $fn3 = (param0: Raw) => ({
    deferrableInitiallyDeferred: this.deferrable0().initiallyDeferred0().$end,
    deferrableInitiallyImmediate: this.deferrable0().initiallyImmediate0().$end,
    notDeferrableInitiallyDeferred: this.notDeferrable0().initiallyDeferred0().$end,
    notDeferrableInitiallyImmediate: this.notDeferrable0().initiallyImmediate0().$end,
    initiallyDeferred: this.initiallyDeferred0().$end,
    initiallyImmediate: this.initiallyImmediate0().$end,
  });
  $fn4 = (index_parameters: Raw) => ({
    deferrableInitiallyDeferred: this.deferrable0().initiallyDeferred0().$end,
    deferrableInitiallyImmediate: this.deferrable0().initiallyImmediate0().$end,
    notDeferrableInitiallyDeferred: this.notDeferrable0().initiallyDeferred0().$end,
    notDeferrableInitiallyImmediate: this.notDeferrable0().initiallyImmediate0().$end,
    initiallyDeferred: this.initiallyDeferred0().$end,
    initiallyImmediate: this.initiallyImmediate0().$end,
  });
  $fn5 = (index_parameters: Raw) => ({
    deferrableInitiallyDeferred: this.deferrable0().initiallyDeferred0().$end,
    deferrableInitiallyImmediate: this.deferrable0().initiallyImmediate0().$end,
    notDeferrableInitiallyDeferred: this.notDeferrable0().initiallyDeferred0().$end,
    notDeferrableInitiallyImmediate: this.notDeferrable0().initiallyImmediate0().$end,
    initiallyDeferred: this.initiallyDeferred0().$end,
    initiallyImmediate: this.initiallyImmediate0().$end,
  });
  $fn11 = (reftable: Raw, param1: Raw) => ({
    matchFullOnDelete: this.matchFull2().onDelete2().$fn13,
    matchFullOnDeleteOnUpdate: this.matchFull2().onDelete2().onUpdate2().$fn12,
    matchFullOnDeleteOnUpdateDeferrableInitiallyDeferred: this.matchFull2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    matchFullOnDeleteOnUpdateDeferrableInitiallyImmediate: this.matchFull2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    matchFullOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.matchFull2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    matchFullOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.matchFull2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    matchFullOnDeleteOnUpdateInitiallyDeferred: this.matchFull2().onDelete2().onUpdate2().initiallyDeferred0().$end,
    matchFullOnDeleteOnUpdateInitiallyImmediate: this.matchFull2().onDelete2().onUpdate2().initiallyImmediate0().$end,
    matchFullOnDeleteDeferrableInitiallyDeferred: this.matchFull2().onDelete2().deferrable0().initiallyDeferred0().$end,
    matchFullOnDeleteDeferrableInitiallyImmediate: this.matchFull2().onDelete2().deferrable0().initiallyImmediate0()
      .$end,
    matchFullOnDeleteNotDeferrableInitiallyDeferred: this.matchFull2().onDelete2().notDeferrable0().initiallyDeferred0()
      .$end,
    matchFullOnDeleteNotDeferrableInitiallyImmediate: this.matchFull2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    matchFullOnDeleteInitiallyDeferred: this.matchFull2().onDelete2().initiallyDeferred0().$end,
    matchFullOnDeleteInitiallyImmediate: this.matchFull2().onDelete2().initiallyImmediate0().$end,
    matchFullOnUpdate: this.matchFull2().onUpdate2().$fn12,
    matchFullOnUpdateDeferrableInitiallyDeferred: this.matchFull2().onUpdate2().deferrable0().initiallyDeferred0().$end,
    matchFullOnUpdateDeferrableInitiallyImmediate: this.matchFull2().onUpdate2().deferrable0().initiallyImmediate0()
      .$end,
    matchFullOnUpdateNotDeferrableInitiallyDeferred: this.matchFull2().onUpdate2().notDeferrable0().initiallyDeferred0()
      .$end,
    matchFullOnUpdateNotDeferrableInitiallyImmediate: this.matchFull2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    matchFullOnUpdateInitiallyDeferred: this.matchFull2().onUpdate2().initiallyDeferred0().$end,
    matchFullOnUpdateInitiallyImmediate: this.matchFull2().onUpdate2().initiallyImmediate0().$end,
    matchFullDeferrableInitiallyDeferred: this.matchFull2().deferrable0().initiallyDeferred0().$end,
    matchFullDeferrableInitiallyImmediate: this.matchFull2().deferrable0().initiallyImmediate0().$end,
    matchFullNotDeferrableInitiallyDeferred: this.matchFull2().notDeferrable0().initiallyDeferred0().$end,
    matchFullNotDeferrableInitiallyImmediate: this.matchFull2().notDeferrable0().initiallyImmediate0().$end,
    matchFullInitiallyDeferred: this.matchFull2().initiallyDeferred0().$end,
    matchFullInitiallyImmediate: this.matchFull2().initiallyImmediate0().$end,
    matchPartialOnDelete: this.matchPartial2().onDelete2().$fn13,
    matchPartialOnDeleteOnUpdate: this.matchPartial2().onDelete2().onUpdate2().$fn12,
    matchPartialOnDeleteOnUpdateDeferrableInitiallyDeferred: this.matchPartial2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    matchPartialOnDeleteOnUpdateDeferrableInitiallyImmediate: this.matchPartial2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    matchPartialOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.matchPartial2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    matchPartialOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.matchPartial2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    matchPartialOnDeleteOnUpdateInitiallyDeferred: this.matchPartial2().onDelete2().onUpdate2().initiallyDeferred0()
      .$end,
    matchPartialOnDeleteOnUpdateInitiallyImmediate: this.matchPartial2().onDelete2().onUpdate2().initiallyImmediate0()
      .$end,
    matchPartialOnDeleteDeferrableInitiallyDeferred: this.matchPartial2().onDelete2().deferrable0().initiallyDeferred0()
      .$end,
    matchPartialOnDeleteDeferrableInitiallyImmediate: this.matchPartial2()
      .onDelete2()
      .deferrable0()
      .initiallyImmediate0().$end,
    matchPartialOnDeleteNotDeferrableInitiallyDeferred: this.matchPartial2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    matchPartialOnDeleteNotDeferrableInitiallyImmediate: this.matchPartial2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    matchPartialOnDeleteInitiallyDeferred: this.matchPartial2().onDelete2().initiallyDeferred0().$end,
    matchPartialOnDeleteInitiallyImmediate: this.matchPartial2().onDelete2().initiallyImmediate0().$end,
    matchPartialOnUpdate: this.matchPartial2().onUpdate2().$fn12,
    matchPartialOnUpdateDeferrableInitiallyDeferred: this.matchPartial2().onUpdate2().deferrable0().initiallyDeferred0()
      .$end,
    matchPartialOnUpdateDeferrableInitiallyImmediate: this.matchPartial2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    matchPartialOnUpdateNotDeferrableInitiallyDeferred: this.matchPartial2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    matchPartialOnUpdateNotDeferrableInitiallyImmediate: this.matchPartial2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    matchPartialOnUpdateInitiallyDeferred: this.matchPartial2().onUpdate2().initiallyDeferred0().$end,
    matchPartialOnUpdateInitiallyImmediate: this.matchPartial2().onUpdate2().initiallyImmediate0().$end,
    matchPartialDeferrableInitiallyDeferred: this.matchPartial2().deferrable0().initiallyDeferred0().$end,
    matchPartialDeferrableInitiallyImmediate: this.matchPartial2().deferrable0().initiallyImmediate0().$end,
    matchPartialNotDeferrableInitiallyDeferred: this.matchPartial2().notDeferrable0().initiallyDeferred0().$end,
    matchPartialNotDeferrableInitiallyImmediate: this.matchPartial2().notDeferrable0().initiallyImmediate0().$end,
    matchPartialInitiallyDeferred: this.matchPartial2().initiallyDeferred0().$end,
    matchPartialInitiallyImmediate: this.matchPartial2().initiallyImmediate0().$end,
    matchSimpleOnDelete: this.matchSimple2().onDelete2().$fn13,
    matchSimpleOnDeleteOnUpdate: this.matchSimple2().onDelete2().onUpdate2().$fn12,
    matchSimpleOnDeleteOnUpdateDeferrableInitiallyDeferred: this.matchSimple2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyDeferred0().$end,
    matchSimpleOnDeleteOnUpdateDeferrableInitiallyImmediate: this.matchSimple2()
      .onDelete2()
      .onUpdate2()
      .deferrable0()
      .initiallyImmediate0().$end,
    matchSimpleOnDeleteOnUpdateNotDeferrableInitiallyDeferred: this.matchSimple2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    matchSimpleOnDeleteOnUpdateNotDeferrableInitiallyImmediate: this.matchSimple2()
      .onDelete2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    matchSimpleOnDeleteOnUpdateInitiallyDeferred: this.matchSimple2().onDelete2().onUpdate2().initiallyDeferred0().$end,
    matchSimpleOnDeleteOnUpdateInitiallyImmediate: this.matchSimple2().onDelete2().onUpdate2().initiallyImmediate0()
      .$end,
    matchSimpleOnDeleteDeferrableInitiallyDeferred: this.matchSimple2().onDelete2().deferrable0().initiallyDeferred0()
      .$end,
    matchSimpleOnDeleteDeferrableInitiallyImmediate: this.matchSimple2().onDelete2().deferrable0().initiallyImmediate0()
      .$end,
    matchSimpleOnDeleteNotDeferrableInitiallyDeferred: this.matchSimple2()
      .onDelete2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    matchSimpleOnDeleteNotDeferrableInitiallyImmediate: this.matchSimple2()
      .onDelete2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    matchSimpleOnDeleteInitiallyDeferred: this.matchSimple2().onDelete2().initiallyDeferred0().$end,
    matchSimpleOnDeleteInitiallyImmediate: this.matchSimple2().onDelete2().initiallyImmediate0().$end,
    matchSimpleOnUpdate: this.matchSimple2().onUpdate2().$fn12,
    matchSimpleOnUpdateDeferrableInitiallyDeferred: this.matchSimple2().onUpdate2().deferrable0().initiallyDeferred0()
      .$end,
    matchSimpleOnUpdateDeferrableInitiallyImmediate: this.matchSimple2().onUpdate2().deferrable0().initiallyImmediate0()
      .$end,
    matchSimpleOnUpdateNotDeferrableInitiallyDeferred: this.matchSimple2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyDeferred0().$end,
    matchSimpleOnUpdateNotDeferrableInitiallyImmediate: this.matchSimple2()
      .onUpdate2()
      .notDeferrable0()
      .initiallyImmediate0().$end,
    matchSimpleOnUpdateInitiallyDeferred: this.matchSimple2().onUpdate2().initiallyDeferred0().$end,
    matchSimpleOnUpdateInitiallyImmediate: this.matchSimple2().onUpdate2().initiallyImmediate0().$end,
    matchSimpleDeferrableInitiallyDeferred: this.matchSimple2().deferrable0().initiallyDeferred0().$end,
    matchSimpleDeferrableInitiallyImmediate: this.matchSimple2().deferrable0().initiallyImmediate0().$end,
    matchSimpleNotDeferrableInitiallyDeferred: this.matchSimple2().notDeferrable0().initiallyDeferred0().$end,
    matchSimpleNotDeferrableInitiallyImmediate: this.matchSimple2().notDeferrable0().initiallyImmediate0().$end,
    matchSimpleInitiallyDeferred: this.matchSimple2().initiallyDeferred0().$end,
    matchSimpleInitiallyImmediate: this.matchSimple2().initiallyImmediate0().$end,
    onDelete: this.onDelete2().$fn13,
    onDeleteOnUpdate: this.onDelete2().onUpdate2().$fn12,
    onDeleteOnUpdateDeferrableInitiallyDeferred: this.onDelete2().onUpdate2().deferrable0().initiallyDeferred0().$end,
    onDeleteOnUpdateDeferrableInitiallyImmediate: this.onDelete2().onUpdate2().deferrable0().initiallyImmediate0().$end,
    onDeleteOnUpdateNotDeferrableInitiallyDeferred: this.onDelete2().onUpdate2().notDeferrable0().initiallyDeferred0()
      .$end,
    onDeleteOnUpdateNotDeferrableInitiallyImmediate: this.onDelete2().onUpdate2().notDeferrable0().initiallyImmediate0()
      .$end,
    onDeleteOnUpdateInitiallyDeferred: this.onDelete2().onUpdate2().initiallyDeferred0().$end,
    onDeleteOnUpdateInitiallyImmediate: this.onDelete2().onUpdate2().initiallyImmediate0().$end,
    onDeleteDeferrableInitiallyDeferred: this.onDelete2().deferrable0().initiallyDeferred0().$end,
    onDeleteDeferrableInitiallyImmediate: this.onDelete2().deferrable0().initiallyImmediate0().$end,
    onDeleteNotDeferrableInitiallyDeferred: this.onDelete2().notDeferrable0().initiallyDeferred0().$end,
    onDeleteNotDeferrableInitiallyImmediate: this.onDelete2().notDeferrable0().initiallyImmediate0().$end,
    onDeleteInitiallyDeferred: this.onDelete2().initiallyDeferred0().$end,
    onDeleteInitiallyImmediate: this.onDelete2().initiallyImmediate0().$end,
    onUpdate: this.onUpdate2().$fn12,
    onUpdateDeferrableInitiallyDeferred: this.onUpdate2().deferrable0().initiallyDeferred0().$end,
    onUpdateDeferrableInitiallyImmediate: this.onUpdate2().deferrable0().initiallyImmediate0().$end,
    onUpdateNotDeferrableInitiallyDeferred: this.onUpdate2().notDeferrable0().initiallyDeferred0().$end,
    onUpdateNotDeferrableInitiallyImmediate: this.onUpdate2().notDeferrable0().initiallyImmediate0().$end,
    onUpdateInitiallyDeferred: this.onUpdate2().initiallyDeferred0().$end,
    onUpdateInitiallyImmediate: this.onUpdate2().initiallyImmediate0().$end,
    deferrableInitiallyDeferred: this.deferrable0().initiallyDeferred0().$end,
    deferrableInitiallyImmediate: this.deferrable0().initiallyImmediate0().$end,
    notDeferrableInitiallyDeferred: this.notDeferrable0().initiallyDeferred0().$end,
    notDeferrableInitiallyImmediate: this.notDeferrable0().initiallyImmediate0().$end,
    initiallyDeferred: this.initiallyDeferred0().$end,
    initiallyImmediate: this.initiallyImmediate0().$end,
  });
  $fn13 = (referential_action: Raw) => ({
    onUpdate: this.onUpdate2().$fn12,
    onUpdateDeferrableInitiallyDeferred: this.onUpdate2().deferrable0().initiallyDeferred0().$end,
    onUpdateDeferrableInitiallyImmediate: this.onUpdate2().deferrable0().initiallyImmediate0().$end,
    onUpdateNotDeferrableInitiallyDeferred: this.onUpdate2().notDeferrable0().initiallyDeferred0().$end,
    onUpdateNotDeferrableInitiallyImmediate: this.onUpdate2().notDeferrable0().initiallyImmediate0().$end,
    onUpdateInitiallyDeferred: this.onUpdate2().initiallyDeferred0().$end,
    onUpdateInitiallyImmediate: this.onUpdate2().initiallyImmediate0().$end,
    deferrableInitiallyDeferred: this.deferrable0().initiallyDeferred0().$end,
    deferrableInitiallyImmediate: this.deferrable0().initiallyImmediate0().$end,
    notDeferrableInitiallyDeferred: this.notDeferrable0().initiallyDeferred0().$end,
    notDeferrableInitiallyImmediate: this.notDeferrable0().initiallyImmediate0().$end,
    initiallyDeferred: this.initiallyDeferred0().$end,
    initiallyImmediate: this.initiallyImmediate0().$end,
  });
  $fn12 = (referential_action: Raw) => ({
    deferrableInitiallyDeferred: this.deferrable0().initiallyDeferred0().$end,
    deferrableInitiallyImmediate: this.deferrable0().initiallyImmediate0().$end,
    notDeferrableInitiallyDeferred: this.notDeferrable0().initiallyDeferred0().$end,
    notDeferrableInitiallyImmediate: this.notDeferrable0().initiallyImmediate0().$end,
    initiallyDeferred: this.initiallyDeferred0().$end,
    initiallyImmediate: this.initiallyImmediate0().$end,
  });
}
