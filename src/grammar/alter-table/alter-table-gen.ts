import { RawBuilder } from "kysely";
import { Builder, grammars, ParameterType, AnnotationBuilder } from "./alter-table";


type Raw = RawBuilder<any>;

export class TestBuilder extends Builder {
  $annotations = grammars.test.annotations;
  $start = () => ({ alterTable: this.alterTable0().$fn1 });
  alterTable0 = () => this;
  $fn1 = this.$annotations[0](
    new (class extends AnnotationBuilder<this> {
      $end() {
        return {
          then: this.builder.then1().$fn2,
        }
      }
    })(this)
  )
  then1 = () => this;
  $fn2 = (...args: ParameterType<(typeof this.$annotations)[1]>) => ({});
}

export class AddBuilder extends Builder {
  $annotations = grammars.add.annotations;
  $start = () => ({
    addColumnIfNotExists: this.add0().column0().ifNotExists0().$fn5,
    addColumn: this.add0().column0().$fn5,
    addIfNotExists: this.add0().ifNotExists0().$fn5,
    add: this.add0().$fn5,
  });
  add0 = () => this;
  column0 = () => this;
  ifNotExists0 = () => this;
  $fn5 = (column_name: Raw, data_type: Raw) => ({ collate: this.collate2().$fn7, $: this.$fn6 });
  collate2 = () => this;
  $fn7 = (collation: Raw) => ({ $: this.$fn6 });
  $fn6 = (column_constraint: Raw) => ({});
}

export class ColConstraintBuilder extends Builder {
  $annotations = grammars.colConstraint.annotations;
  $start = () => ({
    constraint: this.constraint0().$fn14,
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
    default: this.default0().$fn1,
    generatedAlwaysAs: this.generatedAlwaysAs0().$fn2,
    generatedAlwaysAsIdentity: this.generated0().always0().asIdentity0().$fn3,
    generatedByDefaultAsIdentity: this.generated0().byDefault0().asIdentity0().$fn3,
    uniqueNullsNotDistinct: this.unique0().nulls0().not0().distinct0().$fn4,
    uniqueNullsDistinct: this.unique0().nulls0().distinct0().$fn4,
    unique: this.unique0().$fn4,
    primaryKey: this.primaryKey0().$fn5,
    references: this.references0().$fn11,
  });
  constraint0 = () => this;
  notNull0 = () => this;
  deferrable0 = () => this;
  initiallyDeferred0 = () => this;
  initiallyImmediate0 = () => this;
  notDeferrable0 = () => this;
  null0 = () => this;
  check0 = () => this;
  default0 = () => this;
  generatedAlwaysAs0 = () => this;
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
    default: this.default0().$fn1,
    generatedAlwaysAs: this.generatedAlwaysAs0().$fn2,
    generatedAlwaysAsIdentity: this.generated0().always0().asIdentity0().$fn3,
    generatedByDefaultAsIdentity: this.generated0().byDefault0().asIdentity0().$fn3,
    uniqueNullsNotDistinct: this.unique0().nulls0().not0().distinct0().$fn4,
    uniqueNullsDistinct: this.unique0().nulls0().distinct0().$fn4,
    unique: this.unique0().$fn4,
    primaryKey: this.primaryKey0().$fn5,
    references: this.references0().$fn11,
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
  noInherit1 = () => this;
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
  stored1 = () => this;
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
    matchFullOnUpdate: this.matchFull2().onUpdate2().$fn12,
    matchFullDeferrableInitiallyDeferred: this.matchFull2().deferrable0().initiallyDeferred0().$end,
    matchFullDeferrableInitiallyImmediate: this.matchFull2().deferrable0().initiallyImmediate0().$end,
    matchFullNotDeferrableInitiallyDeferred: this.matchFull2().notDeferrable0().initiallyDeferred0().$end,
    matchFullNotDeferrableInitiallyImmediate: this.matchFull2().notDeferrable0().initiallyImmediate0().$end,
    matchFullInitiallyDeferred: this.matchFull2().initiallyDeferred0().$end,
    matchFullInitiallyImmediate: this.matchFull2().initiallyImmediate0().$end,
    matchPartialOnDelete: this.matchPartial2().onDelete2().$fn13,
    matchPartialOnUpdate: this.matchPartial2().onUpdate2().$fn12,
    matchPartialDeferrableInitiallyDeferred: this.matchPartial2().deferrable0().initiallyDeferred0().$end,
    matchPartialDeferrableInitiallyImmediate: this.matchPartial2().deferrable0().initiallyImmediate0().$end,
    matchPartialNotDeferrableInitiallyDeferred: this.matchPartial2().notDeferrable0().initiallyDeferred0().$end,
    matchPartialNotDeferrableInitiallyImmediate: this.matchPartial2().notDeferrable0().initiallyImmediate0().$end,
    matchPartialInitiallyDeferred: this.matchPartial2().initiallyDeferred0().$end,
    matchPartialInitiallyImmediate: this.matchPartial2().initiallyImmediate0().$end,
    matchSimpleOnDelete: this.matchSimple2().onDelete2().$fn13,
    matchSimpleOnUpdate: this.matchSimple2().onUpdate2().$fn12,
    matchSimpleDeferrableInitiallyDeferred: this.matchSimple2().deferrable0().initiallyDeferred0().$end,
    matchSimpleDeferrableInitiallyImmediate: this.matchSimple2().deferrable0().initiallyImmediate0().$end,
    matchSimpleNotDeferrableInitiallyDeferred: this.matchSimple2().notDeferrable0().initiallyDeferred0().$end,
    matchSimpleNotDeferrableInitiallyImmediate: this.matchSimple2().notDeferrable0().initiallyImmediate0().$end,
    matchSimpleInitiallyDeferred: this.matchSimple2().initiallyDeferred0().$end,
    matchSimpleInitiallyImmediate: this.matchSimple2().initiallyImmediate0().$end,
    onDelete: this.onDelete2().$fn13,
    onUpdate: this.onUpdate2().$fn12,
    deferrableInitiallyDeferred: this.deferrable0().initiallyDeferred0().$end,
    deferrableInitiallyImmediate: this.deferrable0().initiallyImmediate0().$end,
    notDeferrableInitiallyDeferred: this.notDeferrable0().initiallyDeferred0().$end,
    notDeferrableInitiallyImmediate: this.notDeferrable0().initiallyImmediate0().$end,
    initiallyDeferred: this.initiallyDeferred0().$end,
    initiallyImmediate: this.initiallyImmediate0().$end,
  });
  matchFull2 = () => this;
  onDelete2 = () => this;
  onUpdate2 = () => this;
  matchPartial2 = () => this;
  matchSimple2 = () => this;
  $fn13 = (referential_action: Raw) => ({
    onUpdate: this.onUpdate2().$fn12,
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
