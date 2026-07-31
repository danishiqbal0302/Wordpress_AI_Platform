
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ConnectedWebsite
 * 
 */
export type ConnectedWebsite = $Result.DefaultSelection<Prisma.$ConnectedWebsitePayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>
/**
 * Model WordPressSite
 * 
 */
export type WordPressSite = $Result.DefaultSelection<Prisma.$WordPressSitePayload>
/**
 * Model ActionProposal
 * 
 */
export type ActionProposal = $Result.DefaultSelection<Prisma.$ActionProposalPayload>
/**
 * Model ActionLogItem
 * 
 */
export type ActionLogItem = $Result.DefaultSelection<Prisma.$ActionLogItemPayload>
/**
 * Model SiteAuditSummary
 * 
 */
export type SiteAuditSummary = $Result.DefaultSelection<Prisma.$SiteAuditSummaryPayload>
/**
 * Model AuditIssue
 * 
 */
export type AuditIssue = $Result.DefaultSelection<Prisma.$AuditIssuePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.connectedWebsite`: Exposes CRUD operations for the **ConnectedWebsite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConnectedWebsites
    * const connectedWebsites = await prisma.connectedWebsite.findMany()
    * ```
    */
  get connectedWebsite(): Prisma.ConnectedWebsiteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wordPressSite`: Exposes CRUD operations for the **WordPressSite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WordPressSites
    * const wordPressSites = await prisma.wordPressSite.findMany()
    * ```
    */
  get wordPressSite(): Prisma.WordPressSiteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actionProposal`: Exposes CRUD operations for the **ActionProposal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActionProposals
    * const actionProposals = await prisma.actionProposal.findMany()
    * ```
    */
  get actionProposal(): Prisma.ActionProposalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actionLogItem`: Exposes CRUD operations for the **ActionLogItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActionLogItems
    * const actionLogItems = await prisma.actionLogItem.findMany()
    * ```
    */
  get actionLogItem(): Prisma.ActionLogItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siteAuditSummary`: Exposes CRUD operations for the **SiteAuditSummary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteAuditSummaries
    * const siteAuditSummaries = await prisma.siteAuditSummary.findMany()
    * ```
    */
  get siteAuditSummary(): Prisma.SiteAuditSummaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditIssue`: Exposes CRUD operations for the **AuditIssue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditIssues
    * const auditIssues = await prisma.auditIssue.findMany()
    * ```
    */
  get auditIssue(): Prisma.AuditIssueDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    ConnectedWebsite: 'ConnectedWebsite',
    Session: 'Session',
    PasswordResetToken: 'PasswordResetToken',
    WordPressSite: 'WordPressSite',
    ActionProposal: 'ActionProposal',
    ActionLogItem: 'ActionLogItem',
    SiteAuditSummary: 'SiteAuditSummary',
    AuditIssue: 'AuditIssue'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "connectedWebsite" | "session" | "passwordResetToken" | "wordPressSite" | "actionProposal" | "actionLogItem" | "siteAuditSummary" | "auditIssue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ConnectedWebsite: {
        payload: Prisma.$ConnectedWebsitePayload<ExtArgs>
        fields: Prisma.ConnectedWebsiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConnectedWebsiteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConnectedWebsiteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload>
          }
          findFirst: {
            args: Prisma.ConnectedWebsiteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConnectedWebsiteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload>
          }
          findMany: {
            args: Prisma.ConnectedWebsiteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload>[]
          }
          create: {
            args: Prisma.ConnectedWebsiteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload>
          }
          createMany: {
            args: Prisma.ConnectedWebsiteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConnectedWebsiteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload>[]
          }
          delete: {
            args: Prisma.ConnectedWebsiteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload>
          }
          update: {
            args: Prisma.ConnectedWebsiteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload>
          }
          deleteMany: {
            args: Prisma.ConnectedWebsiteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConnectedWebsiteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConnectedWebsiteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload>[]
          }
          upsert: {
            args: Prisma.ConnectedWebsiteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectedWebsitePayload>
          }
          aggregate: {
            args: Prisma.ConnectedWebsiteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConnectedWebsite>
          }
          groupBy: {
            args: Prisma.ConnectedWebsiteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConnectedWebsiteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConnectedWebsiteCountArgs<ExtArgs>
            result: $Utils.Optional<ConnectedWebsiteCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
      WordPressSite: {
        payload: Prisma.$WordPressSitePayload<ExtArgs>
        fields: Prisma.WordPressSiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WordPressSiteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WordPressSiteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload>
          }
          findFirst: {
            args: Prisma.WordPressSiteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WordPressSiteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload>
          }
          findMany: {
            args: Prisma.WordPressSiteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload>[]
          }
          create: {
            args: Prisma.WordPressSiteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload>
          }
          createMany: {
            args: Prisma.WordPressSiteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WordPressSiteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload>[]
          }
          delete: {
            args: Prisma.WordPressSiteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload>
          }
          update: {
            args: Prisma.WordPressSiteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload>
          }
          deleteMany: {
            args: Prisma.WordPressSiteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WordPressSiteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WordPressSiteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload>[]
          }
          upsert: {
            args: Prisma.WordPressSiteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPressSitePayload>
          }
          aggregate: {
            args: Prisma.WordPressSiteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWordPressSite>
          }
          groupBy: {
            args: Prisma.WordPressSiteGroupByArgs<ExtArgs>
            result: $Utils.Optional<WordPressSiteGroupByOutputType>[]
          }
          count: {
            args: Prisma.WordPressSiteCountArgs<ExtArgs>
            result: $Utils.Optional<WordPressSiteCountAggregateOutputType> | number
          }
        }
      }
      ActionProposal: {
        payload: Prisma.$ActionProposalPayload<ExtArgs>
        fields: Prisma.ActionProposalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActionProposalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActionProposalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload>
          }
          findFirst: {
            args: Prisma.ActionProposalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActionProposalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload>
          }
          findMany: {
            args: Prisma.ActionProposalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload>[]
          }
          create: {
            args: Prisma.ActionProposalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload>
          }
          createMany: {
            args: Prisma.ActionProposalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActionProposalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload>[]
          }
          delete: {
            args: Prisma.ActionProposalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload>
          }
          update: {
            args: Prisma.ActionProposalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload>
          }
          deleteMany: {
            args: Prisma.ActionProposalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActionProposalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActionProposalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload>[]
          }
          upsert: {
            args: Prisma.ActionProposalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionProposalPayload>
          }
          aggregate: {
            args: Prisma.ActionProposalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActionProposal>
          }
          groupBy: {
            args: Prisma.ActionProposalGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActionProposalGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActionProposalCountArgs<ExtArgs>
            result: $Utils.Optional<ActionProposalCountAggregateOutputType> | number
          }
        }
      }
      ActionLogItem: {
        payload: Prisma.$ActionLogItemPayload<ExtArgs>
        fields: Prisma.ActionLogItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActionLogItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActionLogItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload>
          }
          findFirst: {
            args: Prisma.ActionLogItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActionLogItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload>
          }
          findMany: {
            args: Prisma.ActionLogItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload>[]
          }
          create: {
            args: Prisma.ActionLogItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload>
          }
          createMany: {
            args: Prisma.ActionLogItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActionLogItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload>[]
          }
          delete: {
            args: Prisma.ActionLogItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload>
          }
          update: {
            args: Prisma.ActionLogItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload>
          }
          deleteMany: {
            args: Prisma.ActionLogItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActionLogItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActionLogItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload>[]
          }
          upsert: {
            args: Prisma.ActionLogItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogItemPayload>
          }
          aggregate: {
            args: Prisma.ActionLogItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActionLogItem>
          }
          groupBy: {
            args: Prisma.ActionLogItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActionLogItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActionLogItemCountArgs<ExtArgs>
            result: $Utils.Optional<ActionLogItemCountAggregateOutputType> | number
          }
        }
      }
      SiteAuditSummary: {
        payload: Prisma.$SiteAuditSummaryPayload<ExtArgs>
        fields: Prisma.SiteAuditSummaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteAuditSummaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteAuditSummaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload>
          }
          findFirst: {
            args: Prisma.SiteAuditSummaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteAuditSummaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload>
          }
          findMany: {
            args: Prisma.SiteAuditSummaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload>[]
          }
          create: {
            args: Prisma.SiteAuditSummaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload>
          }
          createMany: {
            args: Prisma.SiteAuditSummaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteAuditSummaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload>[]
          }
          delete: {
            args: Prisma.SiteAuditSummaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload>
          }
          update: {
            args: Prisma.SiteAuditSummaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload>
          }
          deleteMany: {
            args: Prisma.SiteAuditSummaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteAuditSummaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteAuditSummaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload>[]
          }
          upsert: {
            args: Prisma.SiteAuditSummaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteAuditSummaryPayload>
          }
          aggregate: {
            args: Prisma.SiteAuditSummaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteAuditSummary>
          }
          groupBy: {
            args: Prisma.SiteAuditSummaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteAuditSummaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteAuditSummaryCountArgs<ExtArgs>
            result: $Utils.Optional<SiteAuditSummaryCountAggregateOutputType> | number
          }
        }
      }
      AuditIssue: {
        payload: Prisma.$AuditIssuePayload<ExtArgs>
        fields: Prisma.AuditIssueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditIssueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditIssueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload>
          }
          findFirst: {
            args: Prisma.AuditIssueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditIssueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload>
          }
          findMany: {
            args: Prisma.AuditIssueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload>[]
          }
          create: {
            args: Prisma.AuditIssueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload>
          }
          createMany: {
            args: Prisma.AuditIssueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditIssueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload>[]
          }
          delete: {
            args: Prisma.AuditIssueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload>
          }
          update: {
            args: Prisma.AuditIssueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload>
          }
          deleteMany: {
            args: Prisma.AuditIssueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditIssueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditIssueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload>[]
          }
          upsert: {
            args: Prisma.AuditIssueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditIssuePayload>
          }
          aggregate: {
            args: Prisma.AuditIssueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditIssue>
          }
          groupBy: {
            args: Prisma.AuditIssueGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditIssueGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditIssueCountArgs<ExtArgs>
            result: $Utils.Optional<AuditIssueCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    connectedWebsite?: ConnectedWebsiteOmit
    session?: SessionOmit
    passwordResetToken?: PasswordResetTokenOmit
    wordPressSite?: WordPressSiteOmit
    actionProposal?: ActionProposalOmit
    actionLogItem?: ActionLogItemOmit
    siteAuditSummary?: SiteAuditSummaryOmit
    auditIssue?: AuditIssueOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    sites: number
    connectedWebsites: number
    proposals: number
    actionLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    sites?: boolean | UserCountOutputTypeCountSitesArgs
    connectedWebsites?: boolean | UserCountOutputTypeCountConnectedWebsitesArgs
    proposals?: boolean | UserCountOutputTypeCountProposalsArgs
    actionLogs?: boolean | UserCountOutputTypeCountActionLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WordPressSiteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConnectedWebsitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectedWebsiteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionProposalWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionLogItemWhereInput
  }


  /**
   * Count Type WordPressSiteCountOutputType
   */

  export type WordPressSiteCountOutputType = {
    proposals: number
    actionLogs: number
    audits: number
  }

  export type WordPressSiteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proposals?: boolean | WordPressSiteCountOutputTypeCountProposalsArgs
    actionLogs?: boolean | WordPressSiteCountOutputTypeCountActionLogsArgs
    audits?: boolean | WordPressSiteCountOutputTypeCountAuditsArgs
  }

  // Custom InputTypes
  /**
   * WordPressSiteCountOutputType without action
   */
  export type WordPressSiteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSiteCountOutputType
     */
    select?: WordPressSiteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WordPressSiteCountOutputType without action
   */
  export type WordPressSiteCountOutputTypeCountProposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionProposalWhereInput
  }

  /**
   * WordPressSiteCountOutputType without action
   */
  export type WordPressSiteCountOutputTypeCountActionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionLogItemWhereInput
  }

  /**
   * WordPressSiteCountOutputType without action
   */
  export type WordPressSiteCountOutputTypeCountAuditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteAuditSummaryWhereInput
  }


  /**
   * Count Type SiteAuditSummaryCountOutputType
   */

  export type SiteAuditSummaryCountOutputType = {
    issues: number
  }

  export type SiteAuditSummaryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    issues?: boolean | SiteAuditSummaryCountOutputTypeCountIssuesArgs
  }

  // Custom InputTypes
  /**
   * SiteAuditSummaryCountOutputType without action
   */
  export type SiteAuditSummaryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummaryCountOutputType
     */
    select?: SiteAuditSummaryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SiteAuditSummaryCountOutputType without action
   */
  export type SiteAuditSummaryCountOutputTypeCountIssuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditIssueWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    role: string | null
    agencyName: string | null
    apiKey: string | null
    avatar: string | null
    auditSchedule: string | null
    staleProtection: boolean | null
    autoPurgeCache: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    role: string | null
    agencyName: string | null
    apiKey: string | null
    avatar: string | null
    auditSchedule: string | null
    staleProtection: boolean | null
    autoPurgeCache: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    role: number
    agencyName: number
    apiKey: number
    avatar: number
    auditSchedule: number
    staleProtection: number
    autoPurgeCache: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    role?: true
    agencyName?: true
    apiKey?: true
    avatar?: true
    auditSchedule?: true
    staleProtection?: true
    autoPurgeCache?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    role?: true
    agencyName?: true
    apiKey?: true
    avatar?: true
    auditSchedule?: true
    staleProtection?: true
    autoPurgeCache?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    role?: true
    agencyName?: true
    apiKey?: true
    avatar?: true
    auditSchedule?: true
    staleProtection?: true
    autoPurgeCache?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    name: string | null
    role: string
    agencyName: string | null
    apiKey: string | null
    avatar: string | null
    auditSchedule: string
    staleProtection: boolean
    autoPurgeCache: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    agencyName?: boolean
    apiKey?: boolean
    avatar?: boolean
    auditSchedule?: boolean
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    sites?: boolean | User$sitesArgs<ExtArgs>
    connectedWebsites?: boolean | User$connectedWebsitesArgs<ExtArgs>
    proposals?: boolean | User$proposalsArgs<ExtArgs>
    actionLogs?: boolean | User$actionLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    agencyName?: boolean
    apiKey?: boolean
    avatar?: boolean
    auditSchedule?: boolean
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    agencyName?: boolean
    apiKey?: boolean
    avatar?: boolean
    auditSchedule?: boolean
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    agencyName?: boolean
    apiKey?: boolean
    avatar?: boolean
    auditSchedule?: boolean
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "role" | "agencyName" | "apiKey" | "avatar" | "auditSchedule" | "staleProtection" | "autoPurgeCache" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    sites?: boolean | User$sitesArgs<ExtArgs>
    connectedWebsites?: boolean | User$connectedWebsitesArgs<ExtArgs>
    proposals?: boolean | User$proposalsArgs<ExtArgs>
    actionLogs?: boolean | User$actionLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      sites: Prisma.$WordPressSitePayload<ExtArgs>[]
      connectedWebsites: Prisma.$ConnectedWebsitePayload<ExtArgs>[]
      proposals: Prisma.$ActionProposalPayload<ExtArgs>[]
      actionLogs: Prisma.$ActionLogItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string | null
      role: string
      agencyName: string | null
      apiKey: string | null
      avatar: string | null
      auditSchedule: string
      staleProtection: boolean
      autoPurgeCache: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sites<T extends User$sitesArgs<ExtArgs> = {}>(args?: Subset<T, User$sitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    connectedWebsites<T extends User$connectedWebsitesArgs<ExtArgs> = {}>(args?: Subset<T, User$connectedWebsitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proposals<T extends User$proposalsArgs<ExtArgs> = {}>(args?: Subset<T, User$proposalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actionLogs<T extends User$actionLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$actionLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly agencyName: FieldRef<"User", 'String'>
    readonly apiKey: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly auditSchedule: FieldRef<"User", 'String'>
    readonly staleProtection: FieldRef<"User", 'Boolean'>
    readonly autoPurgeCache: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.sites
   */
  export type User$sitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    where?: WordPressSiteWhereInput
    orderBy?: WordPressSiteOrderByWithRelationInput | WordPressSiteOrderByWithRelationInput[]
    cursor?: WordPressSiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WordPressSiteScalarFieldEnum | WordPressSiteScalarFieldEnum[]
  }

  /**
   * User.connectedWebsites
   */
  export type User$connectedWebsitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    where?: ConnectedWebsiteWhereInput
    orderBy?: ConnectedWebsiteOrderByWithRelationInput | ConnectedWebsiteOrderByWithRelationInput[]
    cursor?: ConnectedWebsiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConnectedWebsiteScalarFieldEnum | ConnectedWebsiteScalarFieldEnum[]
  }

  /**
   * User.proposals
   */
  export type User$proposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    where?: ActionProposalWhereInput
    orderBy?: ActionProposalOrderByWithRelationInput | ActionProposalOrderByWithRelationInput[]
    cursor?: ActionProposalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionProposalScalarFieldEnum | ActionProposalScalarFieldEnum[]
  }

  /**
   * User.actionLogs
   */
  export type User$actionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    where?: ActionLogItemWhereInput
    orderBy?: ActionLogItemOrderByWithRelationInput | ActionLogItemOrderByWithRelationInput[]
    cursor?: ActionLogItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionLogItemScalarFieldEnum | ActionLogItemScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ConnectedWebsite
   */

  export type AggregateConnectedWebsite = {
    _count: ConnectedWebsiteCountAggregateOutputType | null
    _min: ConnectedWebsiteMinAggregateOutputType | null
    _max: ConnectedWebsiteMaxAggregateOutputType | null
  }

  export type ConnectedWebsiteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    siteUrl: string | null
    apiKey: string | null
    hmacSecret: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConnectedWebsiteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    siteUrl: string | null
    apiKey: string | null
    hmacSecret: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConnectedWebsiteCountAggregateOutputType = {
    id: number
    userId: number
    siteUrl: number
    apiKey: number
    hmacSecret: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConnectedWebsiteMinAggregateInputType = {
    id?: true
    userId?: true
    siteUrl?: true
    apiKey?: true
    hmacSecret?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConnectedWebsiteMaxAggregateInputType = {
    id?: true
    userId?: true
    siteUrl?: true
    apiKey?: true
    hmacSecret?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConnectedWebsiteCountAggregateInputType = {
    id?: true
    userId?: true
    siteUrl?: true
    apiKey?: true
    hmacSecret?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConnectedWebsiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConnectedWebsite to aggregate.
     */
    where?: ConnectedWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectedWebsites to fetch.
     */
    orderBy?: ConnectedWebsiteOrderByWithRelationInput | ConnectedWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConnectedWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectedWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectedWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConnectedWebsites
    **/
    _count?: true | ConnectedWebsiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConnectedWebsiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConnectedWebsiteMaxAggregateInputType
  }

  export type GetConnectedWebsiteAggregateType<T extends ConnectedWebsiteAggregateArgs> = {
        [P in keyof T & keyof AggregateConnectedWebsite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConnectedWebsite[P]>
      : GetScalarType<T[P], AggregateConnectedWebsite[P]>
  }




  export type ConnectedWebsiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectedWebsiteWhereInput
    orderBy?: ConnectedWebsiteOrderByWithAggregationInput | ConnectedWebsiteOrderByWithAggregationInput[]
    by: ConnectedWebsiteScalarFieldEnum[] | ConnectedWebsiteScalarFieldEnum
    having?: ConnectedWebsiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConnectedWebsiteCountAggregateInputType | true
    _min?: ConnectedWebsiteMinAggregateInputType
    _max?: ConnectedWebsiteMaxAggregateInputType
  }

  export type ConnectedWebsiteGroupByOutputType = {
    id: string
    userId: string
    siteUrl: string
    apiKey: string
    hmacSecret: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ConnectedWebsiteCountAggregateOutputType | null
    _min: ConnectedWebsiteMinAggregateOutputType | null
    _max: ConnectedWebsiteMaxAggregateOutputType | null
  }

  type GetConnectedWebsiteGroupByPayload<T extends ConnectedWebsiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConnectedWebsiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConnectedWebsiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConnectedWebsiteGroupByOutputType[P]>
            : GetScalarType<T[P], ConnectedWebsiteGroupByOutputType[P]>
        }
      >
    >


  export type ConnectedWebsiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    siteUrl?: boolean
    apiKey?: boolean
    hmacSecret?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connectedWebsite"]>

  export type ConnectedWebsiteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    siteUrl?: boolean
    apiKey?: boolean
    hmacSecret?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connectedWebsite"]>

  export type ConnectedWebsiteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    siteUrl?: boolean
    apiKey?: boolean
    hmacSecret?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connectedWebsite"]>

  export type ConnectedWebsiteSelectScalar = {
    id?: boolean
    userId?: boolean
    siteUrl?: boolean
    apiKey?: boolean
    hmacSecret?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConnectedWebsiteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "siteUrl" | "apiKey" | "hmacSecret" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["connectedWebsite"]>
  export type ConnectedWebsiteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConnectedWebsiteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConnectedWebsiteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConnectedWebsitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConnectedWebsite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      siteUrl: string
      apiKey: string
      hmacSecret: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["connectedWebsite"]>
    composites: {}
  }

  type ConnectedWebsiteGetPayload<S extends boolean | null | undefined | ConnectedWebsiteDefaultArgs> = $Result.GetResult<Prisma.$ConnectedWebsitePayload, S>

  type ConnectedWebsiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConnectedWebsiteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConnectedWebsiteCountAggregateInputType | true
    }

  export interface ConnectedWebsiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConnectedWebsite'], meta: { name: 'ConnectedWebsite' } }
    /**
     * Find zero or one ConnectedWebsite that matches the filter.
     * @param {ConnectedWebsiteFindUniqueArgs} args - Arguments to find a ConnectedWebsite
     * @example
     * // Get one ConnectedWebsite
     * const connectedWebsite = await prisma.connectedWebsite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConnectedWebsiteFindUniqueArgs>(args: SelectSubset<T, ConnectedWebsiteFindUniqueArgs<ExtArgs>>): Prisma__ConnectedWebsiteClient<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConnectedWebsite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConnectedWebsiteFindUniqueOrThrowArgs} args - Arguments to find a ConnectedWebsite
     * @example
     * // Get one ConnectedWebsite
     * const connectedWebsite = await prisma.connectedWebsite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConnectedWebsiteFindUniqueOrThrowArgs>(args: SelectSubset<T, ConnectedWebsiteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConnectedWebsiteClient<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConnectedWebsite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectedWebsiteFindFirstArgs} args - Arguments to find a ConnectedWebsite
     * @example
     * // Get one ConnectedWebsite
     * const connectedWebsite = await prisma.connectedWebsite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConnectedWebsiteFindFirstArgs>(args?: SelectSubset<T, ConnectedWebsiteFindFirstArgs<ExtArgs>>): Prisma__ConnectedWebsiteClient<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConnectedWebsite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectedWebsiteFindFirstOrThrowArgs} args - Arguments to find a ConnectedWebsite
     * @example
     * // Get one ConnectedWebsite
     * const connectedWebsite = await prisma.connectedWebsite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConnectedWebsiteFindFirstOrThrowArgs>(args?: SelectSubset<T, ConnectedWebsiteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConnectedWebsiteClient<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConnectedWebsites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectedWebsiteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConnectedWebsites
     * const connectedWebsites = await prisma.connectedWebsite.findMany()
     * 
     * // Get first 10 ConnectedWebsites
     * const connectedWebsites = await prisma.connectedWebsite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const connectedWebsiteWithIdOnly = await prisma.connectedWebsite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConnectedWebsiteFindManyArgs>(args?: SelectSubset<T, ConnectedWebsiteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConnectedWebsite.
     * @param {ConnectedWebsiteCreateArgs} args - Arguments to create a ConnectedWebsite.
     * @example
     * // Create one ConnectedWebsite
     * const ConnectedWebsite = await prisma.connectedWebsite.create({
     *   data: {
     *     // ... data to create a ConnectedWebsite
     *   }
     * })
     * 
     */
    create<T extends ConnectedWebsiteCreateArgs>(args: SelectSubset<T, ConnectedWebsiteCreateArgs<ExtArgs>>): Prisma__ConnectedWebsiteClient<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConnectedWebsites.
     * @param {ConnectedWebsiteCreateManyArgs} args - Arguments to create many ConnectedWebsites.
     * @example
     * // Create many ConnectedWebsites
     * const connectedWebsite = await prisma.connectedWebsite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConnectedWebsiteCreateManyArgs>(args?: SelectSubset<T, ConnectedWebsiteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConnectedWebsites and returns the data saved in the database.
     * @param {ConnectedWebsiteCreateManyAndReturnArgs} args - Arguments to create many ConnectedWebsites.
     * @example
     * // Create many ConnectedWebsites
     * const connectedWebsite = await prisma.connectedWebsite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConnectedWebsites and only return the `id`
     * const connectedWebsiteWithIdOnly = await prisma.connectedWebsite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConnectedWebsiteCreateManyAndReturnArgs>(args?: SelectSubset<T, ConnectedWebsiteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConnectedWebsite.
     * @param {ConnectedWebsiteDeleteArgs} args - Arguments to delete one ConnectedWebsite.
     * @example
     * // Delete one ConnectedWebsite
     * const ConnectedWebsite = await prisma.connectedWebsite.delete({
     *   where: {
     *     // ... filter to delete one ConnectedWebsite
     *   }
     * })
     * 
     */
    delete<T extends ConnectedWebsiteDeleteArgs>(args: SelectSubset<T, ConnectedWebsiteDeleteArgs<ExtArgs>>): Prisma__ConnectedWebsiteClient<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConnectedWebsite.
     * @param {ConnectedWebsiteUpdateArgs} args - Arguments to update one ConnectedWebsite.
     * @example
     * // Update one ConnectedWebsite
     * const connectedWebsite = await prisma.connectedWebsite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConnectedWebsiteUpdateArgs>(args: SelectSubset<T, ConnectedWebsiteUpdateArgs<ExtArgs>>): Prisma__ConnectedWebsiteClient<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConnectedWebsites.
     * @param {ConnectedWebsiteDeleteManyArgs} args - Arguments to filter ConnectedWebsites to delete.
     * @example
     * // Delete a few ConnectedWebsites
     * const { count } = await prisma.connectedWebsite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConnectedWebsiteDeleteManyArgs>(args?: SelectSubset<T, ConnectedWebsiteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConnectedWebsites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectedWebsiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConnectedWebsites
     * const connectedWebsite = await prisma.connectedWebsite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConnectedWebsiteUpdateManyArgs>(args: SelectSubset<T, ConnectedWebsiteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConnectedWebsites and returns the data updated in the database.
     * @param {ConnectedWebsiteUpdateManyAndReturnArgs} args - Arguments to update many ConnectedWebsites.
     * @example
     * // Update many ConnectedWebsites
     * const connectedWebsite = await prisma.connectedWebsite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConnectedWebsites and only return the `id`
     * const connectedWebsiteWithIdOnly = await prisma.connectedWebsite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConnectedWebsiteUpdateManyAndReturnArgs>(args: SelectSubset<T, ConnectedWebsiteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConnectedWebsite.
     * @param {ConnectedWebsiteUpsertArgs} args - Arguments to update or create a ConnectedWebsite.
     * @example
     * // Update or create a ConnectedWebsite
     * const connectedWebsite = await prisma.connectedWebsite.upsert({
     *   create: {
     *     // ... data to create a ConnectedWebsite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConnectedWebsite we want to update
     *   }
     * })
     */
    upsert<T extends ConnectedWebsiteUpsertArgs>(args: SelectSubset<T, ConnectedWebsiteUpsertArgs<ExtArgs>>): Prisma__ConnectedWebsiteClient<$Result.GetResult<Prisma.$ConnectedWebsitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConnectedWebsites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectedWebsiteCountArgs} args - Arguments to filter ConnectedWebsites to count.
     * @example
     * // Count the number of ConnectedWebsites
     * const count = await prisma.connectedWebsite.count({
     *   where: {
     *     // ... the filter for the ConnectedWebsites we want to count
     *   }
     * })
    **/
    count<T extends ConnectedWebsiteCountArgs>(
      args?: Subset<T, ConnectedWebsiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConnectedWebsiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConnectedWebsite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectedWebsiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConnectedWebsiteAggregateArgs>(args: Subset<T, ConnectedWebsiteAggregateArgs>): Prisma.PrismaPromise<GetConnectedWebsiteAggregateType<T>>

    /**
     * Group by ConnectedWebsite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectedWebsiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConnectedWebsiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConnectedWebsiteGroupByArgs['orderBy'] }
        : { orderBy?: ConnectedWebsiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConnectedWebsiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConnectedWebsiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConnectedWebsite model
   */
  readonly fields: ConnectedWebsiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConnectedWebsite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConnectedWebsiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConnectedWebsite model
   */
  interface ConnectedWebsiteFieldRefs {
    readonly id: FieldRef<"ConnectedWebsite", 'String'>
    readonly userId: FieldRef<"ConnectedWebsite", 'String'>
    readonly siteUrl: FieldRef<"ConnectedWebsite", 'String'>
    readonly apiKey: FieldRef<"ConnectedWebsite", 'String'>
    readonly hmacSecret: FieldRef<"ConnectedWebsite", 'String'>
    readonly status: FieldRef<"ConnectedWebsite", 'String'>
    readonly createdAt: FieldRef<"ConnectedWebsite", 'DateTime'>
    readonly updatedAt: FieldRef<"ConnectedWebsite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConnectedWebsite findUnique
   */
  export type ConnectedWebsiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectedWebsite to fetch.
     */
    where: ConnectedWebsiteWhereUniqueInput
  }

  /**
   * ConnectedWebsite findUniqueOrThrow
   */
  export type ConnectedWebsiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectedWebsite to fetch.
     */
    where: ConnectedWebsiteWhereUniqueInput
  }

  /**
   * ConnectedWebsite findFirst
   */
  export type ConnectedWebsiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectedWebsite to fetch.
     */
    where?: ConnectedWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectedWebsites to fetch.
     */
    orderBy?: ConnectedWebsiteOrderByWithRelationInput | ConnectedWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConnectedWebsites.
     */
    cursor?: ConnectedWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectedWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectedWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConnectedWebsites.
     */
    distinct?: ConnectedWebsiteScalarFieldEnum | ConnectedWebsiteScalarFieldEnum[]
  }

  /**
   * ConnectedWebsite findFirstOrThrow
   */
  export type ConnectedWebsiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectedWebsite to fetch.
     */
    where?: ConnectedWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectedWebsites to fetch.
     */
    orderBy?: ConnectedWebsiteOrderByWithRelationInput | ConnectedWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConnectedWebsites.
     */
    cursor?: ConnectedWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectedWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectedWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConnectedWebsites.
     */
    distinct?: ConnectedWebsiteScalarFieldEnum | ConnectedWebsiteScalarFieldEnum[]
  }

  /**
   * ConnectedWebsite findMany
   */
  export type ConnectedWebsiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectedWebsites to fetch.
     */
    where?: ConnectedWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectedWebsites to fetch.
     */
    orderBy?: ConnectedWebsiteOrderByWithRelationInput | ConnectedWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConnectedWebsites.
     */
    cursor?: ConnectedWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectedWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectedWebsites.
     */
    skip?: number
    distinct?: ConnectedWebsiteScalarFieldEnum | ConnectedWebsiteScalarFieldEnum[]
  }

  /**
   * ConnectedWebsite create
   */
  export type ConnectedWebsiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    /**
     * The data needed to create a ConnectedWebsite.
     */
    data: XOR<ConnectedWebsiteCreateInput, ConnectedWebsiteUncheckedCreateInput>
  }

  /**
   * ConnectedWebsite createMany
   */
  export type ConnectedWebsiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConnectedWebsites.
     */
    data: ConnectedWebsiteCreateManyInput | ConnectedWebsiteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConnectedWebsite createManyAndReturn
   */
  export type ConnectedWebsiteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * The data used to create many ConnectedWebsites.
     */
    data: ConnectedWebsiteCreateManyInput | ConnectedWebsiteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConnectedWebsite update
   */
  export type ConnectedWebsiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    /**
     * The data needed to update a ConnectedWebsite.
     */
    data: XOR<ConnectedWebsiteUpdateInput, ConnectedWebsiteUncheckedUpdateInput>
    /**
     * Choose, which ConnectedWebsite to update.
     */
    where: ConnectedWebsiteWhereUniqueInput
  }

  /**
   * ConnectedWebsite updateMany
   */
  export type ConnectedWebsiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConnectedWebsites.
     */
    data: XOR<ConnectedWebsiteUpdateManyMutationInput, ConnectedWebsiteUncheckedUpdateManyInput>
    /**
     * Filter which ConnectedWebsites to update
     */
    where?: ConnectedWebsiteWhereInput
    /**
     * Limit how many ConnectedWebsites to update.
     */
    limit?: number
  }

  /**
   * ConnectedWebsite updateManyAndReturn
   */
  export type ConnectedWebsiteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * The data used to update ConnectedWebsites.
     */
    data: XOR<ConnectedWebsiteUpdateManyMutationInput, ConnectedWebsiteUncheckedUpdateManyInput>
    /**
     * Filter which ConnectedWebsites to update
     */
    where?: ConnectedWebsiteWhereInput
    /**
     * Limit how many ConnectedWebsites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConnectedWebsite upsert
   */
  export type ConnectedWebsiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    /**
     * The filter to search for the ConnectedWebsite to update in case it exists.
     */
    where: ConnectedWebsiteWhereUniqueInput
    /**
     * In case the ConnectedWebsite found by the `where` argument doesn't exist, create a new ConnectedWebsite with this data.
     */
    create: XOR<ConnectedWebsiteCreateInput, ConnectedWebsiteUncheckedCreateInput>
    /**
     * In case the ConnectedWebsite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConnectedWebsiteUpdateInput, ConnectedWebsiteUncheckedUpdateInput>
  }

  /**
   * ConnectedWebsite delete
   */
  export type ConnectedWebsiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
    /**
     * Filter which ConnectedWebsite to delete.
     */
    where: ConnectedWebsiteWhereUniqueInput
  }

  /**
   * ConnectedWebsite deleteMany
   */
  export type ConnectedWebsiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConnectedWebsites to delete
     */
    where?: ConnectedWebsiteWhereInput
    /**
     * Limit how many ConnectedWebsites to delete.
     */
    limit?: number
  }

  /**
   * ConnectedWebsite without action
   */
  export type ConnectedWebsiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectedWebsite
     */
    select?: ConnectedWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectedWebsite
     */
    omit?: ConnectedWebsiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectedWebsiteInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    email: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "expiresAt" | "createdAt", ExtArgs["result"]["passwordResetToken"]>

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokenUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly email: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken updateManyAndReturn
   */
  export type PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
  }


  /**
   * Model WordPressSite
   */

  export type AggregateWordPressSite = {
    _count: WordPressSiteCountAggregateOutputType | null
    _min: WordPressSiteMinAggregateOutputType | null
    _max: WordPressSiteMaxAggregateOutputType | null
  }

  export type WordPressSiteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    url: string | null
    adminEmail: string | null
    connectionState: string | null
    acfVersion: string | null
    themeName: string | null
    lastAuditedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordPressSiteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    url: string | null
    adminEmail: string | null
    connectionState: string | null
    acfVersion: string | null
    themeName: string | null
    lastAuditedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordPressSiteCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    url: number
    adminEmail: number
    connectionState: number
    health: number
    seoProvider: number
    acfVersion: number
    themeName: number
    lastAuditedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WordPressSiteMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    url?: true
    adminEmail?: true
    connectionState?: true
    acfVersion?: true
    themeName?: true
    lastAuditedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordPressSiteMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    url?: true
    adminEmail?: true
    connectionState?: true
    acfVersion?: true
    themeName?: true
    lastAuditedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordPressSiteCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    url?: true
    adminEmail?: true
    connectionState?: true
    health?: true
    seoProvider?: true
    acfVersion?: true
    themeName?: true
    lastAuditedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WordPressSiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WordPressSite to aggregate.
     */
    where?: WordPressSiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordPressSites to fetch.
     */
    orderBy?: WordPressSiteOrderByWithRelationInput | WordPressSiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WordPressSiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordPressSites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordPressSites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WordPressSites
    **/
    _count?: true | WordPressSiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WordPressSiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WordPressSiteMaxAggregateInputType
  }

  export type GetWordPressSiteAggregateType<T extends WordPressSiteAggregateArgs> = {
        [P in keyof T & keyof AggregateWordPressSite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWordPressSite[P]>
      : GetScalarType<T[P], AggregateWordPressSite[P]>
  }




  export type WordPressSiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WordPressSiteWhereInput
    orderBy?: WordPressSiteOrderByWithAggregationInput | WordPressSiteOrderByWithAggregationInput[]
    by: WordPressSiteScalarFieldEnum[] | WordPressSiteScalarFieldEnum
    having?: WordPressSiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WordPressSiteCountAggregateInputType | true
    _min?: WordPressSiteMinAggregateInputType
    _max?: WordPressSiteMaxAggregateInputType
  }

  export type WordPressSiteGroupByOutputType = {
    id: string
    userId: string
    name: string
    url: string
    adminEmail: string
    connectionState: string
    health: JsonValue
    seoProvider: JsonValue
    acfVersion: string | null
    themeName: string
    lastAuditedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: WordPressSiteCountAggregateOutputType | null
    _min: WordPressSiteMinAggregateOutputType | null
    _max: WordPressSiteMaxAggregateOutputType | null
  }

  type GetWordPressSiteGroupByPayload<T extends WordPressSiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WordPressSiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WordPressSiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WordPressSiteGroupByOutputType[P]>
            : GetScalarType<T[P], WordPressSiteGroupByOutputType[P]>
        }
      >
    >


  export type WordPressSiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    url?: boolean
    adminEmail?: boolean
    connectionState?: boolean
    health?: boolean
    seoProvider?: boolean
    acfVersion?: boolean
    themeName?: boolean
    lastAuditedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    proposals?: boolean | WordPressSite$proposalsArgs<ExtArgs>
    actionLogs?: boolean | WordPressSite$actionLogsArgs<ExtArgs>
    audits?: boolean | WordPressSite$auditsArgs<ExtArgs>
    _count?: boolean | WordPressSiteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wordPressSite"]>

  export type WordPressSiteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    url?: boolean
    adminEmail?: boolean
    connectionState?: boolean
    health?: boolean
    seoProvider?: boolean
    acfVersion?: boolean
    themeName?: boolean
    lastAuditedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wordPressSite"]>

  export type WordPressSiteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    url?: boolean
    adminEmail?: boolean
    connectionState?: boolean
    health?: boolean
    seoProvider?: boolean
    acfVersion?: boolean
    themeName?: boolean
    lastAuditedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wordPressSite"]>

  export type WordPressSiteSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    url?: boolean
    adminEmail?: boolean
    connectionState?: boolean
    health?: boolean
    seoProvider?: boolean
    acfVersion?: boolean
    themeName?: boolean
    lastAuditedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WordPressSiteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "url" | "adminEmail" | "connectionState" | "health" | "seoProvider" | "acfVersion" | "themeName" | "lastAuditedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["wordPressSite"]>
  export type WordPressSiteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    proposals?: boolean | WordPressSite$proposalsArgs<ExtArgs>
    actionLogs?: boolean | WordPressSite$actionLogsArgs<ExtArgs>
    audits?: boolean | WordPressSite$auditsArgs<ExtArgs>
    _count?: boolean | WordPressSiteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WordPressSiteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WordPressSiteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WordPressSitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WordPressSite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      proposals: Prisma.$ActionProposalPayload<ExtArgs>[]
      actionLogs: Prisma.$ActionLogItemPayload<ExtArgs>[]
      audits: Prisma.$SiteAuditSummaryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      url: string
      adminEmail: string
      connectionState: string
      health: Prisma.JsonValue
      seoProvider: Prisma.JsonValue
      acfVersion: string | null
      themeName: string
      lastAuditedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wordPressSite"]>
    composites: {}
  }

  type WordPressSiteGetPayload<S extends boolean | null | undefined | WordPressSiteDefaultArgs> = $Result.GetResult<Prisma.$WordPressSitePayload, S>

  type WordPressSiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WordPressSiteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WordPressSiteCountAggregateInputType | true
    }

  export interface WordPressSiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WordPressSite'], meta: { name: 'WordPressSite' } }
    /**
     * Find zero or one WordPressSite that matches the filter.
     * @param {WordPressSiteFindUniqueArgs} args - Arguments to find a WordPressSite
     * @example
     * // Get one WordPressSite
     * const wordPressSite = await prisma.wordPressSite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WordPressSiteFindUniqueArgs>(args: SelectSubset<T, WordPressSiteFindUniqueArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WordPressSite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WordPressSiteFindUniqueOrThrowArgs} args - Arguments to find a WordPressSite
     * @example
     * // Get one WordPressSite
     * const wordPressSite = await prisma.wordPressSite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WordPressSiteFindUniqueOrThrowArgs>(args: SelectSubset<T, WordPressSiteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WordPressSite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPressSiteFindFirstArgs} args - Arguments to find a WordPressSite
     * @example
     * // Get one WordPressSite
     * const wordPressSite = await prisma.wordPressSite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WordPressSiteFindFirstArgs>(args?: SelectSubset<T, WordPressSiteFindFirstArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WordPressSite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPressSiteFindFirstOrThrowArgs} args - Arguments to find a WordPressSite
     * @example
     * // Get one WordPressSite
     * const wordPressSite = await prisma.wordPressSite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WordPressSiteFindFirstOrThrowArgs>(args?: SelectSubset<T, WordPressSiteFindFirstOrThrowArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WordPressSites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPressSiteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WordPressSites
     * const wordPressSites = await prisma.wordPressSite.findMany()
     * 
     * // Get first 10 WordPressSites
     * const wordPressSites = await prisma.wordPressSite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wordPressSiteWithIdOnly = await prisma.wordPressSite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WordPressSiteFindManyArgs>(args?: SelectSubset<T, WordPressSiteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WordPressSite.
     * @param {WordPressSiteCreateArgs} args - Arguments to create a WordPressSite.
     * @example
     * // Create one WordPressSite
     * const WordPressSite = await prisma.wordPressSite.create({
     *   data: {
     *     // ... data to create a WordPressSite
     *   }
     * })
     * 
     */
    create<T extends WordPressSiteCreateArgs>(args: SelectSubset<T, WordPressSiteCreateArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WordPressSites.
     * @param {WordPressSiteCreateManyArgs} args - Arguments to create many WordPressSites.
     * @example
     * // Create many WordPressSites
     * const wordPressSite = await prisma.wordPressSite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WordPressSiteCreateManyArgs>(args?: SelectSubset<T, WordPressSiteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WordPressSites and returns the data saved in the database.
     * @param {WordPressSiteCreateManyAndReturnArgs} args - Arguments to create many WordPressSites.
     * @example
     * // Create many WordPressSites
     * const wordPressSite = await prisma.wordPressSite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WordPressSites and only return the `id`
     * const wordPressSiteWithIdOnly = await prisma.wordPressSite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WordPressSiteCreateManyAndReturnArgs>(args?: SelectSubset<T, WordPressSiteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WordPressSite.
     * @param {WordPressSiteDeleteArgs} args - Arguments to delete one WordPressSite.
     * @example
     * // Delete one WordPressSite
     * const WordPressSite = await prisma.wordPressSite.delete({
     *   where: {
     *     // ... filter to delete one WordPressSite
     *   }
     * })
     * 
     */
    delete<T extends WordPressSiteDeleteArgs>(args: SelectSubset<T, WordPressSiteDeleteArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WordPressSite.
     * @param {WordPressSiteUpdateArgs} args - Arguments to update one WordPressSite.
     * @example
     * // Update one WordPressSite
     * const wordPressSite = await prisma.wordPressSite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WordPressSiteUpdateArgs>(args: SelectSubset<T, WordPressSiteUpdateArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WordPressSites.
     * @param {WordPressSiteDeleteManyArgs} args - Arguments to filter WordPressSites to delete.
     * @example
     * // Delete a few WordPressSites
     * const { count } = await prisma.wordPressSite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WordPressSiteDeleteManyArgs>(args?: SelectSubset<T, WordPressSiteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WordPressSites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPressSiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WordPressSites
     * const wordPressSite = await prisma.wordPressSite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WordPressSiteUpdateManyArgs>(args: SelectSubset<T, WordPressSiteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WordPressSites and returns the data updated in the database.
     * @param {WordPressSiteUpdateManyAndReturnArgs} args - Arguments to update many WordPressSites.
     * @example
     * // Update many WordPressSites
     * const wordPressSite = await prisma.wordPressSite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WordPressSites and only return the `id`
     * const wordPressSiteWithIdOnly = await prisma.wordPressSite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WordPressSiteUpdateManyAndReturnArgs>(args: SelectSubset<T, WordPressSiteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WordPressSite.
     * @param {WordPressSiteUpsertArgs} args - Arguments to update or create a WordPressSite.
     * @example
     * // Update or create a WordPressSite
     * const wordPressSite = await prisma.wordPressSite.upsert({
     *   create: {
     *     // ... data to create a WordPressSite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WordPressSite we want to update
     *   }
     * })
     */
    upsert<T extends WordPressSiteUpsertArgs>(args: SelectSubset<T, WordPressSiteUpsertArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WordPressSites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPressSiteCountArgs} args - Arguments to filter WordPressSites to count.
     * @example
     * // Count the number of WordPressSites
     * const count = await prisma.wordPressSite.count({
     *   where: {
     *     // ... the filter for the WordPressSites we want to count
     *   }
     * })
    **/
    count<T extends WordPressSiteCountArgs>(
      args?: Subset<T, WordPressSiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WordPressSiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WordPressSite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPressSiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WordPressSiteAggregateArgs>(args: Subset<T, WordPressSiteAggregateArgs>): Prisma.PrismaPromise<GetWordPressSiteAggregateType<T>>

    /**
     * Group by WordPressSite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPressSiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WordPressSiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WordPressSiteGroupByArgs['orderBy'] }
        : { orderBy?: WordPressSiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WordPressSiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWordPressSiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WordPressSite model
   */
  readonly fields: WordPressSiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WordPressSite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WordPressSiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    proposals<T extends WordPressSite$proposalsArgs<ExtArgs> = {}>(args?: Subset<T, WordPressSite$proposalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actionLogs<T extends WordPressSite$actionLogsArgs<ExtArgs> = {}>(args?: Subset<T, WordPressSite$actionLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    audits<T extends WordPressSite$auditsArgs<ExtArgs> = {}>(args?: Subset<T, WordPressSite$auditsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WordPressSite model
   */
  interface WordPressSiteFieldRefs {
    readonly id: FieldRef<"WordPressSite", 'String'>
    readonly userId: FieldRef<"WordPressSite", 'String'>
    readonly name: FieldRef<"WordPressSite", 'String'>
    readonly url: FieldRef<"WordPressSite", 'String'>
    readonly adminEmail: FieldRef<"WordPressSite", 'String'>
    readonly connectionState: FieldRef<"WordPressSite", 'String'>
    readonly health: FieldRef<"WordPressSite", 'Json'>
    readonly seoProvider: FieldRef<"WordPressSite", 'Json'>
    readonly acfVersion: FieldRef<"WordPressSite", 'String'>
    readonly themeName: FieldRef<"WordPressSite", 'String'>
    readonly lastAuditedAt: FieldRef<"WordPressSite", 'DateTime'>
    readonly createdAt: FieldRef<"WordPressSite", 'DateTime'>
    readonly updatedAt: FieldRef<"WordPressSite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WordPressSite findUnique
   */
  export type WordPressSiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    /**
     * Filter, which WordPressSite to fetch.
     */
    where: WordPressSiteWhereUniqueInput
  }

  /**
   * WordPressSite findUniqueOrThrow
   */
  export type WordPressSiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    /**
     * Filter, which WordPressSite to fetch.
     */
    where: WordPressSiteWhereUniqueInput
  }

  /**
   * WordPressSite findFirst
   */
  export type WordPressSiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    /**
     * Filter, which WordPressSite to fetch.
     */
    where?: WordPressSiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordPressSites to fetch.
     */
    orderBy?: WordPressSiteOrderByWithRelationInput | WordPressSiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WordPressSites.
     */
    cursor?: WordPressSiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordPressSites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordPressSites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WordPressSites.
     */
    distinct?: WordPressSiteScalarFieldEnum | WordPressSiteScalarFieldEnum[]
  }

  /**
   * WordPressSite findFirstOrThrow
   */
  export type WordPressSiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    /**
     * Filter, which WordPressSite to fetch.
     */
    where?: WordPressSiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordPressSites to fetch.
     */
    orderBy?: WordPressSiteOrderByWithRelationInput | WordPressSiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WordPressSites.
     */
    cursor?: WordPressSiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordPressSites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordPressSites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WordPressSites.
     */
    distinct?: WordPressSiteScalarFieldEnum | WordPressSiteScalarFieldEnum[]
  }

  /**
   * WordPressSite findMany
   */
  export type WordPressSiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    /**
     * Filter, which WordPressSites to fetch.
     */
    where?: WordPressSiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordPressSites to fetch.
     */
    orderBy?: WordPressSiteOrderByWithRelationInput | WordPressSiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WordPressSites.
     */
    cursor?: WordPressSiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordPressSites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordPressSites.
     */
    skip?: number
    distinct?: WordPressSiteScalarFieldEnum | WordPressSiteScalarFieldEnum[]
  }

  /**
   * WordPressSite create
   */
  export type WordPressSiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    /**
     * The data needed to create a WordPressSite.
     */
    data: XOR<WordPressSiteCreateInput, WordPressSiteUncheckedCreateInput>
  }

  /**
   * WordPressSite createMany
   */
  export type WordPressSiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WordPressSites.
     */
    data: WordPressSiteCreateManyInput | WordPressSiteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WordPressSite createManyAndReturn
   */
  export type WordPressSiteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * The data used to create many WordPressSites.
     */
    data: WordPressSiteCreateManyInput | WordPressSiteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WordPressSite update
   */
  export type WordPressSiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    /**
     * The data needed to update a WordPressSite.
     */
    data: XOR<WordPressSiteUpdateInput, WordPressSiteUncheckedUpdateInput>
    /**
     * Choose, which WordPressSite to update.
     */
    where: WordPressSiteWhereUniqueInput
  }

  /**
   * WordPressSite updateMany
   */
  export type WordPressSiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WordPressSites.
     */
    data: XOR<WordPressSiteUpdateManyMutationInput, WordPressSiteUncheckedUpdateManyInput>
    /**
     * Filter which WordPressSites to update
     */
    where?: WordPressSiteWhereInput
    /**
     * Limit how many WordPressSites to update.
     */
    limit?: number
  }

  /**
   * WordPressSite updateManyAndReturn
   */
  export type WordPressSiteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * The data used to update WordPressSites.
     */
    data: XOR<WordPressSiteUpdateManyMutationInput, WordPressSiteUncheckedUpdateManyInput>
    /**
     * Filter which WordPressSites to update
     */
    where?: WordPressSiteWhereInput
    /**
     * Limit how many WordPressSites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WordPressSite upsert
   */
  export type WordPressSiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    /**
     * The filter to search for the WordPressSite to update in case it exists.
     */
    where: WordPressSiteWhereUniqueInput
    /**
     * In case the WordPressSite found by the `where` argument doesn't exist, create a new WordPressSite with this data.
     */
    create: XOR<WordPressSiteCreateInput, WordPressSiteUncheckedCreateInput>
    /**
     * In case the WordPressSite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WordPressSiteUpdateInput, WordPressSiteUncheckedUpdateInput>
  }

  /**
   * WordPressSite delete
   */
  export type WordPressSiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
    /**
     * Filter which WordPressSite to delete.
     */
    where: WordPressSiteWhereUniqueInput
  }

  /**
   * WordPressSite deleteMany
   */
  export type WordPressSiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WordPressSites to delete
     */
    where?: WordPressSiteWhereInput
    /**
     * Limit how many WordPressSites to delete.
     */
    limit?: number
  }

  /**
   * WordPressSite.proposals
   */
  export type WordPressSite$proposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    where?: ActionProposalWhereInput
    orderBy?: ActionProposalOrderByWithRelationInput | ActionProposalOrderByWithRelationInput[]
    cursor?: ActionProposalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionProposalScalarFieldEnum | ActionProposalScalarFieldEnum[]
  }

  /**
   * WordPressSite.actionLogs
   */
  export type WordPressSite$actionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    where?: ActionLogItemWhereInput
    orderBy?: ActionLogItemOrderByWithRelationInput | ActionLogItemOrderByWithRelationInput[]
    cursor?: ActionLogItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionLogItemScalarFieldEnum | ActionLogItemScalarFieldEnum[]
  }

  /**
   * WordPressSite.audits
   */
  export type WordPressSite$auditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    where?: SiteAuditSummaryWhereInput
    orderBy?: SiteAuditSummaryOrderByWithRelationInput | SiteAuditSummaryOrderByWithRelationInput[]
    cursor?: SiteAuditSummaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SiteAuditSummaryScalarFieldEnum | SiteAuditSummaryScalarFieldEnum[]
  }

  /**
   * WordPressSite without action
   */
  export type WordPressSiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPressSite
     */
    select?: WordPressSiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPressSite
     */
    omit?: WordPressSiteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPressSiteInclude<ExtArgs> | null
  }


  /**
   * Model ActionProposal
   */

  export type AggregateActionProposal = {
    _count: ActionProposalCountAggregateOutputType | null
    _avg: ActionProposalAvgAggregateOutputType | null
    _sum: ActionProposalSumAggregateOutputType | null
    _min: ActionProposalMinAggregateOutputType | null
    _max: ActionProposalMaxAggregateOutputType | null
  }

  export type ActionProposalAvgAggregateOutputType = {
    targetPageId: number | null
  }

  export type ActionProposalSumAggregateOutputType = {
    targetPageId: number | null
  }

  export type ActionProposalMinAggregateOutputType = {
    id: string | null
    siteId: string | null
    userId: string | null
    targetPageId: number | null
    targetPageTitle: string | null
    targetPageSlug: string | null
    actionType: string | null
    approvedChecksum: string | null
    currentChecksum: string | null
    isStale: boolean | null
    seoProvider: string | null
    adapterSupportLevel: string | null
    rollbackConfidence: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActionProposalMaxAggregateOutputType = {
    id: string | null
    siteId: string | null
    userId: string | null
    targetPageId: number | null
    targetPageTitle: string | null
    targetPageSlug: string | null
    actionType: string | null
    approvedChecksum: string | null
    currentChecksum: string | null
    isStale: boolean | null
    seoProvider: string | null
    adapterSupportLevel: string | null
    rollbackConfidence: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActionProposalCountAggregateOutputType = {
    id: number
    siteId: number
    userId: number
    targetPageId: number
    targetPageTitle: number
    targetPageSlug: number
    actionType: number
    currentValues: number
    proposedValues: number
    approvedChecksum: number
    currentChecksum: number
    isStale: number
    seoProvider: number
    adapterSupportLevel: number
    rollbackConfidence: number
    possibleSideEffects: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ActionProposalAvgAggregateInputType = {
    targetPageId?: true
  }

  export type ActionProposalSumAggregateInputType = {
    targetPageId?: true
  }

  export type ActionProposalMinAggregateInputType = {
    id?: true
    siteId?: true
    userId?: true
    targetPageId?: true
    targetPageTitle?: true
    targetPageSlug?: true
    actionType?: true
    approvedChecksum?: true
    currentChecksum?: true
    isStale?: true
    seoProvider?: true
    adapterSupportLevel?: true
    rollbackConfidence?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActionProposalMaxAggregateInputType = {
    id?: true
    siteId?: true
    userId?: true
    targetPageId?: true
    targetPageTitle?: true
    targetPageSlug?: true
    actionType?: true
    approvedChecksum?: true
    currentChecksum?: true
    isStale?: true
    seoProvider?: true
    adapterSupportLevel?: true
    rollbackConfidence?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActionProposalCountAggregateInputType = {
    id?: true
    siteId?: true
    userId?: true
    targetPageId?: true
    targetPageTitle?: true
    targetPageSlug?: true
    actionType?: true
    currentValues?: true
    proposedValues?: true
    approvedChecksum?: true
    currentChecksum?: true
    isStale?: true
    seoProvider?: true
    adapterSupportLevel?: true
    rollbackConfidence?: true
    possibleSideEffects?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActionProposalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionProposal to aggregate.
     */
    where?: ActionProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionProposals to fetch.
     */
    orderBy?: ActionProposalOrderByWithRelationInput | ActionProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActionProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActionProposals
    **/
    _count?: true | ActionProposalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActionProposalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActionProposalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActionProposalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActionProposalMaxAggregateInputType
  }

  export type GetActionProposalAggregateType<T extends ActionProposalAggregateArgs> = {
        [P in keyof T & keyof AggregateActionProposal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActionProposal[P]>
      : GetScalarType<T[P], AggregateActionProposal[P]>
  }




  export type ActionProposalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionProposalWhereInput
    orderBy?: ActionProposalOrderByWithAggregationInput | ActionProposalOrderByWithAggregationInput[]
    by: ActionProposalScalarFieldEnum[] | ActionProposalScalarFieldEnum
    having?: ActionProposalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActionProposalCountAggregateInputType | true
    _avg?: ActionProposalAvgAggregateInputType
    _sum?: ActionProposalSumAggregateInputType
    _min?: ActionProposalMinAggregateInputType
    _max?: ActionProposalMaxAggregateInputType
  }

  export type ActionProposalGroupByOutputType = {
    id: string
    siteId: string
    userId: string | null
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonValue
    proposedValues: JsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonValue
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ActionProposalCountAggregateOutputType | null
    _avg: ActionProposalAvgAggregateOutputType | null
    _sum: ActionProposalSumAggregateOutputType | null
    _min: ActionProposalMinAggregateOutputType | null
    _max: ActionProposalMaxAggregateOutputType | null
  }

  type GetActionProposalGroupByPayload<T extends ActionProposalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActionProposalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActionProposalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActionProposalGroupByOutputType[P]>
            : GetScalarType<T[P], ActionProposalGroupByOutputType[P]>
        }
      >
    >


  export type ActionProposalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteId?: boolean
    userId?: boolean
    targetPageId?: boolean
    targetPageTitle?: boolean
    targetPageSlug?: boolean
    actionType?: boolean
    currentValues?: boolean
    proposedValues?: boolean
    approvedChecksum?: boolean
    currentChecksum?: boolean
    isStale?: boolean
    seoProvider?: boolean
    adapterSupportLevel?: boolean
    rollbackConfidence?: boolean
    possibleSideEffects?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionProposal$userArgs<ExtArgs>
  }, ExtArgs["result"]["actionProposal"]>

  export type ActionProposalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteId?: boolean
    userId?: boolean
    targetPageId?: boolean
    targetPageTitle?: boolean
    targetPageSlug?: boolean
    actionType?: boolean
    currentValues?: boolean
    proposedValues?: boolean
    approvedChecksum?: boolean
    currentChecksum?: boolean
    isStale?: boolean
    seoProvider?: boolean
    adapterSupportLevel?: boolean
    rollbackConfidence?: boolean
    possibleSideEffects?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionProposal$userArgs<ExtArgs>
  }, ExtArgs["result"]["actionProposal"]>

  export type ActionProposalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteId?: boolean
    userId?: boolean
    targetPageId?: boolean
    targetPageTitle?: boolean
    targetPageSlug?: boolean
    actionType?: boolean
    currentValues?: boolean
    proposedValues?: boolean
    approvedChecksum?: boolean
    currentChecksum?: boolean
    isStale?: boolean
    seoProvider?: boolean
    adapterSupportLevel?: boolean
    rollbackConfidence?: boolean
    possibleSideEffects?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionProposal$userArgs<ExtArgs>
  }, ExtArgs["result"]["actionProposal"]>

  export type ActionProposalSelectScalar = {
    id?: boolean
    siteId?: boolean
    userId?: boolean
    targetPageId?: boolean
    targetPageTitle?: boolean
    targetPageSlug?: boolean
    actionType?: boolean
    currentValues?: boolean
    proposedValues?: boolean
    approvedChecksum?: boolean
    currentChecksum?: boolean
    isStale?: boolean
    seoProvider?: boolean
    adapterSupportLevel?: boolean
    rollbackConfidence?: boolean
    possibleSideEffects?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ActionProposalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "siteId" | "userId" | "targetPageId" | "targetPageTitle" | "targetPageSlug" | "actionType" | "currentValues" | "proposedValues" | "approvedChecksum" | "currentChecksum" | "isStale" | "seoProvider" | "adapterSupportLevel" | "rollbackConfidence" | "possibleSideEffects" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["actionProposal"]>
  export type ActionProposalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionProposal$userArgs<ExtArgs>
  }
  export type ActionProposalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionProposal$userArgs<ExtArgs>
  }
  export type ActionProposalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionProposal$userArgs<ExtArgs>
  }

  export type $ActionProposalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActionProposal"
    objects: {
      site: Prisma.$WordPressSitePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      siteId: string
      userId: string | null
      targetPageId: number
      targetPageTitle: string
      targetPageSlug: string
      actionType: string
      currentValues: Prisma.JsonValue
      proposedValues: Prisma.JsonValue
      approvedChecksum: string
      currentChecksum: string
      isStale: boolean
      seoProvider: string
      adapterSupportLevel: string
      rollbackConfidence: string
      possibleSideEffects: Prisma.JsonValue
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["actionProposal"]>
    composites: {}
  }

  type ActionProposalGetPayload<S extends boolean | null | undefined | ActionProposalDefaultArgs> = $Result.GetResult<Prisma.$ActionProposalPayload, S>

  type ActionProposalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActionProposalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActionProposalCountAggregateInputType | true
    }

  export interface ActionProposalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActionProposal'], meta: { name: 'ActionProposal' } }
    /**
     * Find zero or one ActionProposal that matches the filter.
     * @param {ActionProposalFindUniqueArgs} args - Arguments to find a ActionProposal
     * @example
     * // Get one ActionProposal
     * const actionProposal = await prisma.actionProposal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActionProposalFindUniqueArgs>(args: SelectSubset<T, ActionProposalFindUniqueArgs<ExtArgs>>): Prisma__ActionProposalClient<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActionProposal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActionProposalFindUniqueOrThrowArgs} args - Arguments to find a ActionProposal
     * @example
     * // Get one ActionProposal
     * const actionProposal = await prisma.actionProposal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActionProposalFindUniqueOrThrowArgs>(args: SelectSubset<T, ActionProposalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActionProposalClient<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionProposal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionProposalFindFirstArgs} args - Arguments to find a ActionProposal
     * @example
     * // Get one ActionProposal
     * const actionProposal = await prisma.actionProposal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActionProposalFindFirstArgs>(args?: SelectSubset<T, ActionProposalFindFirstArgs<ExtArgs>>): Prisma__ActionProposalClient<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionProposal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionProposalFindFirstOrThrowArgs} args - Arguments to find a ActionProposal
     * @example
     * // Get one ActionProposal
     * const actionProposal = await prisma.actionProposal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActionProposalFindFirstOrThrowArgs>(args?: SelectSubset<T, ActionProposalFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActionProposalClient<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActionProposals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionProposalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActionProposals
     * const actionProposals = await prisma.actionProposal.findMany()
     * 
     * // Get first 10 ActionProposals
     * const actionProposals = await prisma.actionProposal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actionProposalWithIdOnly = await prisma.actionProposal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActionProposalFindManyArgs>(args?: SelectSubset<T, ActionProposalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActionProposal.
     * @param {ActionProposalCreateArgs} args - Arguments to create a ActionProposal.
     * @example
     * // Create one ActionProposal
     * const ActionProposal = await prisma.actionProposal.create({
     *   data: {
     *     // ... data to create a ActionProposal
     *   }
     * })
     * 
     */
    create<T extends ActionProposalCreateArgs>(args: SelectSubset<T, ActionProposalCreateArgs<ExtArgs>>): Prisma__ActionProposalClient<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActionProposals.
     * @param {ActionProposalCreateManyArgs} args - Arguments to create many ActionProposals.
     * @example
     * // Create many ActionProposals
     * const actionProposal = await prisma.actionProposal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActionProposalCreateManyArgs>(args?: SelectSubset<T, ActionProposalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActionProposals and returns the data saved in the database.
     * @param {ActionProposalCreateManyAndReturnArgs} args - Arguments to create many ActionProposals.
     * @example
     * // Create many ActionProposals
     * const actionProposal = await prisma.actionProposal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActionProposals and only return the `id`
     * const actionProposalWithIdOnly = await prisma.actionProposal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActionProposalCreateManyAndReturnArgs>(args?: SelectSubset<T, ActionProposalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActionProposal.
     * @param {ActionProposalDeleteArgs} args - Arguments to delete one ActionProposal.
     * @example
     * // Delete one ActionProposal
     * const ActionProposal = await prisma.actionProposal.delete({
     *   where: {
     *     // ... filter to delete one ActionProposal
     *   }
     * })
     * 
     */
    delete<T extends ActionProposalDeleteArgs>(args: SelectSubset<T, ActionProposalDeleteArgs<ExtArgs>>): Prisma__ActionProposalClient<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActionProposal.
     * @param {ActionProposalUpdateArgs} args - Arguments to update one ActionProposal.
     * @example
     * // Update one ActionProposal
     * const actionProposal = await prisma.actionProposal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActionProposalUpdateArgs>(args: SelectSubset<T, ActionProposalUpdateArgs<ExtArgs>>): Prisma__ActionProposalClient<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActionProposals.
     * @param {ActionProposalDeleteManyArgs} args - Arguments to filter ActionProposals to delete.
     * @example
     * // Delete a few ActionProposals
     * const { count } = await prisma.actionProposal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActionProposalDeleteManyArgs>(args?: SelectSubset<T, ActionProposalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionProposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionProposalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActionProposals
     * const actionProposal = await prisma.actionProposal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActionProposalUpdateManyArgs>(args: SelectSubset<T, ActionProposalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionProposals and returns the data updated in the database.
     * @param {ActionProposalUpdateManyAndReturnArgs} args - Arguments to update many ActionProposals.
     * @example
     * // Update many ActionProposals
     * const actionProposal = await prisma.actionProposal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActionProposals and only return the `id`
     * const actionProposalWithIdOnly = await prisma.actionProposal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActionProposalUpdateManyAndReturnArgs>(args: SelectSubset<T, ActionProposalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActionProposal.
     * @param {ActionProposalUpsertArgs} args - Arguments to update or create a ActionProposal.
     * @example
     * // Update or create a ActionProposal
     * const actionProposal = await prisma.actionProposal.upsert({
     *   create: {
     *     // ... data to create a ActionProposal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActionProposal we want to update
     *   }
     * })
     */
    upsert<T extends ActionProposalUpsertArgs>(args: SelectSubset<T, ActionProposalUpsertArgs<ExtArgs>>): Prisma__ActionProposalClient<$Result.GetResult<Prisma.$ActionProposalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActionProposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionProposalCountArgs} args - Arguments to filter ActionProposals to count.
     * @example
     * // Count the number of ActionProposals
     * const count = await prisma.actionProposal.count({
     *   where: {
     *     // ... the filter for the ActionProposals we want to count
     *   }
     * })
    **/
    count<T extends ActionProposalCountArgs>(
      args?: Subset<T, ActionProposalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActionProposalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActionProposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionProposalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActionProposalAggregateArgs>(args: Subset<T, ActionProposalAggregateArgs>): Prisma.PrismaPromise<GetActionProposalAggregateType<T>>

    /**
     * Group by ActionProposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionProposalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActionProposalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActionProposalGroupByArgs['orderBy'] }
        : { orderBy?: ActionProposalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActionProposalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActionProposalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActionProposal model
   */
  readonly fields: ActionProposalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActionProposal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActionProposalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    site<T extends WordPressSiteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WordPressSiteDefaultArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends ActionProposal$userArgs<ExtArgs> = {}>(args?: Subset<T, ActionProposal$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActionProposal model
   */
  interface ActionProposalFieldRefs {
    readonly id: FieldRef<"ActionProposal", 'String'>
    readonly siteId: FieldRef<"ActionProposal", 'String'>
    readonly userId: FieldRef<"ActionProposal", 'String'>
    readonly targetPageId: FieldRef<"ActionProposal", 'Int'>
    readonly targetPageTitle: FieldRef<"ActionProposal", 'String'>
    readonly targetPageSlug: FieldRef<"ActionProposal", 'String'>
    readonly actionType: FieldRef<"ActionProposal", 'String'>
    readonly currentValues: FieldRef<"ActionProposal", 'Json'>
    readonly proposedValues: FieldRef<"ActionProposal", 'Json'>
    readonly approvedChecksum: FieldRef<"ActionProposal", 'String'>
    readonly currentChecksum: FieldRef<"ActionProposal", 'String'>
    readonly isStale: FieldRef<"ActionProposal", 'Boolean'>
    readonly seoProvider: FieldRef<"ActionProposal", 'String'>
    readonly adapterSupportLevel: FieldRef<"ActionProposal", 'String'>
    readonly rollbackConfidence: FieldRef<"ActionProposal", 'String'>
    readonly possibleSideEffects: FieldRef<"ActionProposal", 'Json'>
    readonly status: FieldRef<"ActionProposal", 'String'>
    readonly createdAt: FieldRef<"ActionProposal", 'DateTime'>
    readonly updatedAt: FieldRef<"ActionProposal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActionProposal findUnique
   */
  export type ActionProposalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    /**
     * Filter, which ActionProposal to fetch.
     */
    where: ActionProposalWhereUniqueInput
  }

  /**
   * ActionProposal findUniqueOrThrow
   */
  export type ActionProposalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    /**
     * Filter, which ActionProposal to fetch.
     */
    where: ActionProposalWhereUniqueInput
  }

  /**
   * ActionProposal findFirst
   */
  export type ActionProposalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    /**
     * Filter, which ActionProposal to fetch.
     */
    where?: ActionProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionProposals to fetch.
     */
    orderBy?: ActionProposalOrderByWithRelationInput | ActionProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionProposals.
     */
    cursor?: ActionProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionProposals.
     */
    distinct?: ActionProposalScalarFieldEnum | ActionProposalScalarFieldEnum[]
  }

  /**
   * ActionProposal findFirstOrThrow
   */
  export type ActionProposalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    /**
     * Filter, which ActionProposal to fetch.
     */
    where?: ActionProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionProposals to fetch.
     */
    orderBy?: ActionProposalOrderByWithRelationInput | ActionProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionProposals.
     */
    cursor?: ActionProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionProposals.
     */
    distinct?: ActionProposalScalarFieldEnum | ActionProposalScalarFieldEnum[]
  }

  /**
   * ActionProposal findMany
   */
  export type ActionProposalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    /**
     * Filter, which ActionProposals to fetch.
     */
    where?: ActionProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionProposals to fetch.
     */
    orderBy?: ActionProposalOrderByWithRelationInput | ActionProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActionProposals.
     */
    cursor?: ActionProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionProposals.
     */
    skip?: number
    distinct?: ActionProposalScalarFieldEnum | ActionProposalScalarFieldEnum[]
  }

  /**
   * ActionProposal create
   */
  export type ActionProposalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    /**
     * The data needed to create a ActionProposal.
     */
    data: XOR<ActionProposalCreateInput, ActionProposalUncheckedCreateInput>
  }

  /**
   * ActionProposal createMany
   */
  export type ActionProposalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActionProposals.
     */
    data: ActionProposalCreateManyInput | ActionProposalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActionProposal createManyAndReturn
   */
  export type ActionProposalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * The data used to create many ActionProposals.
     */
    data: ActionProposalCreateManyInput | ActionProposalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionProposal update
   */
  export type ActionProposalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    /**
     * The data needed to update a ActionProposal.
     */
    data: XOR<ActionProposalUpdateInput, ActionProposalUncheckedUpdateInput>
    /**
     * Choose, which ActionProposal to update.
     */
    where: ActionProposalWhereUniqueInput
  }

  /**
   * ActionProposal updateMany
   */
  export type ActionProposalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActionProposals.
     */
    data: XOR<ActionProposalUpdateManyMutationInput, ActionProposalUncheckedUpdateManyInput>
    /**
     * Filter which ActionProposals to update
     */
    where?: ActionProposalWhereInput
    /**
     * Limit how many ActionProposals to update.
     */
    limit?: number
  }

  /**
   * ActionProposal updateManyAndReturn
   */
  export type ActionProposalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * The data used to update ActionProposals.
     */
    data: XOR<ActionProposalUpdateManyMutationInput, ActionProposalUncheckedUpdateManyInput>
    /**
     * Filter which ActionProposals to update
     */
    where?: ActionProposalWhereInput
    /**
     * Limit how many ActionProposals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionProposal upsert
   */
  export type ActionProposalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    /**
     * The filter to search for the ActionProposal to update in case it exists.
     */
    where: ActionProposalWhereUniqueInput
    /**
     * In case the ActionProposal found by the `where` argument doesn't exist, create a new ActionProposal with this data.
     */
    create: XOR<ActionProposalCreateInput, ActionProposalUncheckedCreateInput>
    /**
     * In case the ActionProposal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActionProposalUpdateInput, ActionProposalUncheckedUpdateInput>
  }

  /**
   * ActionProposal delete
   */
  export type ActionProposalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
    /**
     * Filter which ActionProposal to delete.
     */
    where: ActionProposalWhereUniqueInput
  }

  /**
   * ActionProposal deleteMany
   */
  export type ActionProposalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionProposals to delete
     */
    where?: ActionProposalWhereInput
    /**
     * Limit how many ActionProposals to delete.
     */
    limit?: number
  }

  /**
   * ActionProposal.user
   */
  export type ActionProposal$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ActionProposal without action
   */
  export type ActionProposalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionProposal
     */
    select?: ActionProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionProposal
     */
    omit?: ActionProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionProposalInclude<ExtArgs> | null
  }


  /**
   * Model ActionLogItem
   */

  export type AggregateActionLogItem = {
    _count: ActionLogItemCountAggregateOutputType | null
    _min: ActionLogItemMinAggregateOutputType | null
    _max: ActionLogItemMaxAggregateOutputType | null
  }

  export type ActionLogItemMinAggregateOutputType = {
    id: string | null
    siteId: string | null
    userId: string | null
    actionTitle: string | null
    targetEntity: string | null
    executedBy: string | null
    timestamp: Date | null
    executionState: string | null
    verificationStatus: string | null
    rollbackStatus: string | null
    rollbackConfidence: string | null
    checksum: string | null
    createdAt: Date | null
  }

  export type ActionLogItemMaxAggregateOutputType = {
    id: string | null
    siteId: string | null
    userId: string | null
    actionTitle: string | null
    targetEntity: string | null
    executedBy: string | null
    timestamp: Date | null
    executionState: string | null
    verificationStatus: string | null
    rollbackStatus: string | null
    rollbackConfidence: string | null
    checksum: string | null
    createdAt: Date | null
  }

  export type ActionLogItemCountAggregateOutputType = {
    id: number
    siteId: number
    userId: number
    actionTitle: number
    targetEntity: number
    executedBy: number
    timestamp: number
    executionState: number
    verificationStatus: number
    rollbackStatus: number
    rollbackConfidence: number
    checksum: number
    snapshotData: number
    sideEffects: number
    createdAt: number
    _all: number
  }


  export type ActionLogItemMinAggregateInputType = {
    id?: true
    siteId?: true
    userId?: true
    actionTitle?: true
    targetEntity?: true
    executedBy?: true
    timestamp?: true
    executionState?: true
    verificationStatus?: true
    rollbackStatus?: true
    rollbackConfidence?: true
    checksum?: true
    createdAt?: true
  }

  export type ActionLogItemMaxAggregateInputType = {
    id?: true
    siteId?: true
    userId?: true
    actionTitle?: true
    targetEntity?: true
    executedBy?: true
    timestamp?: true
    executionState?: true
    verificationStatus?: true
    rollbackStatus?: true
    rollbackConfidence?: true
    checksum?: true
    createdAt?: true
  }

  export type ActionLogItemCountAggregateInputType = {
    id?: true
    siteId?: true
    userId?: true
    actionTitle?: true
    targetEntity?: true
    executedBy?: true
    timestamp?: true
    executionState?: true
    verificationStatus?: true
    rollbackStatus?: true
    rollbackConfidence?: true
    checksum?: true
    snapshotData?: true
    sideEffects?: true
    createdAt?: true
    _all?: true
  }

  export type ActionLogItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionLogItem to aggregate.
     */
    where?: ActionLogItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionLogItems to fetch.
     */
    orderBy?: ActionLogItemOrderByWithRelationInput | ActionLogItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActionLogItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionLogItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionLogItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActionLogItems
    **/
    _count?: true | ActionLogItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActionLogItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActionLogItemMaxAggregateInputType
  }

  export type GetActionLogItemAggregateType<T extends ActionLogItemAggregateArgs> = {
        [P in keyof T & keyof AggregateActionLogItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActionLogItem[P]>
      : GetScalarType<T[P], AggregateActionLogItem[P]>
  }




  export type ActionLogItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionLogItemWhereInput
    orderBy?: ActionLogItemOrderByWithAggregationInput | ActionLogItemOrderByWithAggregationInput[]
    by: ActionLogItemScalarFieldEnum[] | ActionLogItemScalarFieldEnum
    having?: ActionLogItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActionLogItemCountAggregateInputType | true
    _min?: ActionLogItemMinAggregateInputType
    _max?: ActionLogItemMaxAggregateInputType
  }

  export type ActionLogItemGroupByOutputType = {
    id: string
    siteId: string
    userId: string | null
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp: Date
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonValue
    sideEffects: JsonValue
    createdAt: Date
    _count: ActionLogItemCountAggregateOutputType | null
    _min: ActionLogItemMinAggregateOutputType | null
    _max: ActionLogItemMaxAggregateOutputType | null
  }

  type GetActionLogItemGroupByPayload<T extends ActionLogItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActionLogItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActionLogItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActionLogItemGroupByOutputType[P]>
            : GetScalarType<T[P], ActionLogItemGroupByOutputType[P]>
        }
      >
    >


  export type ActionLogItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteId?: boolean
    userId?: boolean
    actionTitle?: boolean
    targetEntity?: boolean
    executedBy?: boolean
    timestamp?: boolean
    executionState?: boolean
    verificationStatus?: boolean
    rollbackStatus?: boolean
    rollbackConfidence?: boolean
    checksum?: boolean
    snapshotData?: boolean
    sideEffects?: boolean
    createdAt?: boolean
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionLogItem$userArgs<ExtArgs>
  }, ExtArgs["result"]["actionLogItem"]>

  export type ActionLogItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteId?: boolean
    userId?: boolean
    actionTitle?: boolean
    targetEntity?: boolean
    executedBy?: boolean
    timestamp?: boolean
    executionState?: boolean
    verificationStatus?: boolean
    rollbackStatus?: boolean
    rollbackConfidence?: boolean
    checksum?: boolean
    snapshotData?: boolean
    sideEffects?: boolean
    createdAt?: boolean
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionLogItem$userArgs<ExtArgs>
  }, ExtArgs["result"]["actionLogItem"]>

  export type ActionLogItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteId?: boolean
    userId?: boolean
    actionTitle?: boolean
    targetEntity?: boolean
    executedBy?: boolean
    timestamp?: boolean
    executionState?: boolean
    verificationStatus?: boolean
    rollbackStatus?: boolean
    rollbackConfidence?: boolean
    checksum?: boolean
    snapshotData?: boolean
    sideEffects?: boolean
    createdAt?: boolean
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionLogItem$userArgs<ExtArgs>
  }, ExtArgs["result"]["actionLogItem"]>

  export type ActionLogItemSelectScalar = {
    id?: boolean
    siteId?: boolean
    userId?: boolean
    actionTitle?: boolean
    targetEntity?: boolean
    executedBy?: boolean
    timestamp?: boolean
    executionState?: boolean
    verificationStatus?: boolean
    rollbackStatus?: boolean
    rollbackConfidence?: boolean
    checksum?: boolean
    snapshotData?: boolean
    sideEffects?: boolean
    createdAt?: boolean
  }

  export type ActionLogItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "siteId" | "userId" | "actionTitle" | "targetEntity" | "executedBy" | "timestamp" | "executionState" | "verificationStatus" | "rollbackStatus" | "rollbackConfidence" | "checksum" | "snapshotData" | "sideEffects" | "createdAt", ExtArgs["result"]["actionLogItem"]>
  export type ActionLogItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionLogItem$userArgs<ExtArgs>
  }
  export type ActionLogItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionLogItem$userArgs<ExtArgs>
  }
  export type ActionLogItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    user?: boolean | ActionLogItem$userArgs<ExtArgs>
  }

  export type $ActionLogItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActionLogItem"
    objects: {
      site: Prisma.$WordPressSitePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      siteId: string
      userId: string | null
      actionTitle: string
      targetEntity: string
      executedBy: string
      timestamp: Date
      executionState: string
      verificationStatus: string
      rollbackStatus: string
      rollbackConfidence: string
      checksum: string
      snapshotData: Prisma.JsonValue
      sideEffects: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["actionLogItem"]>
    composites: {}
  }

  type ActionLogItemGetPayload<S extends boolean | null | undefined | ActionLogItemDefaultArgs> = $Result.GetResult<Prisma.$ActionLogItemPayload, S>

  type ActionLogItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActionLogItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActionLogItemCountAggregateInputType | true
    }

  export interface ActionLogItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActionLogItem'], meta: { name: 'ActionLogItem' } }
    /**
     * Find zero or one ActionLogItem that matches the filter.
     * @param {ActionLogItemFindUniqueArgs} args - Arguments to find a ActionLogItem
     * @example
     * // Get one ActionLogItem
     * const actionLogItem = await prisma.actionLogItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActionLogItemFindUniqueArgs>(args: SelectSubset<T, ActionLogItemFindUniqueArgs<ExtArgs>>): Prisma__ActionLogItemClient<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActionLogItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActionLogItemFindUniqueOrThrowArgs} args - Arguments to find a ActionLogItem
     * @example
     * // Get one ActionLogItem
     * const actionLogItem = await prisma.actionLogItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActionLogItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ActionLogItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActionLogItemClient<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionLogItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogItemFindFirstArgs} args - Arguments to find a ActionLogItem
     * @example
     * // Get one ActionLogItem
     * const actionLogItem = await prisma.actionLogItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActionLogItemFindFirstArgs>(args?: SelectSubset<T, ActionLogItemFindFirstArgs<ExtArgs>>): Prisma__ActionLogItemClient<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionLogItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogItemFindFirstOrThrowArgs} args - Arguments to find a ActionLogItem
     * @example
     * // Get one ActionLogItem
     * const actionLogItem = await prisma.actionLogItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActionLogItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ActionLogItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActionLogItemClient<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActionLogItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActionLogItems
     * const actionLogItems = await prisma.actionLogItem.findMany()
     * 
     * // Get first 10 ActionLogItems
     * const actionLogItems = await prisma.actionLogItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actionLogItemWithIdOnly = await prisma.actionLogItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActionLogItemFindManyArgs>(args?: SelectSubset<T, ActionLogItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActionLogItem.
     * @param {ActionLogItemCreateArgs} args - Arguments to create a ActionLogItem.
     * @example
     * // Create one ActionLogItem
     * const ActionLogItem = await prisma.actionLogItem.create({
     *   data: {
     *     // ... data to create a ActionLogItem
     *   }
     * })
     * 
     */
    create<T extends ActionLogItemCreateArgs>(args: SelectSubset<T, ActionLogItemCreateArgs<ExtArgs>>): Prisma__ActionLogItemClient<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActionLogItems.
     * @param {ActionLogItemCreateManyArgs} args - Arguments to create many ActionLogItems.
     * @example
     * // Create many ActionLogItems
     * const actionLogItem = await prisma.actionLogItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActionLogItemCreateManyArgs>(args?: SelectSubset<T, ActionLogItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActionLogItems and returns the data saved in the database.
     * @param {ActionLogItemCreateManyAndReturnArgs} args - Arguments to create many ActionLogItems.
     * @example
     * // Create many ActionLogItems
     * const actionLogItem = await prisma.actionLogItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActionLogItems and only return the `id`
     * const actionLogItemWithIdOnly = await prisma.actionLogItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActionLogItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ActionLogItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActionLogItem.
     * @param {ActionLogItemDeleteArgs} args - Arguments to delete one ActionLogItem.
     * @example
     * // Delete one ActionLogItem
     * const ActionLogItem = await prisma.actionLogItem.delete({
     *   where: {
     *     // ... filter to delete one ActionLogItem
     *   }
     * })
     * 
     */
    delete<T extends ActionLogItemDeleteArgs>(args: SelectSubset<T, ActionLogItemDeleteArgs<ExtArgs>>): Prisma__ActionLogItemClient<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActionLogItem.
     * @param {ActionLogItemUpdateArgs} args - Arguments to update one ActionLogItem.
     * @example
     * // Update one ActionLogItem
     * const actionLogItem = await prisma.actionLogItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActionLogItemUpdateArgs>(args: SelectSubset<T, ActionLogItemUpdateArgs<ExtArgs>>): Prisma__ActionLogItemClient<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActionLogItems.
     * @param {ActionLogItemDeleteManyArgs} args - Arguments to filter ActionLogItems to delete.
     * @example
     * // Delete a few ActionLogItems
     * const { count } = await prisma.actionLogItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActionLogItemDeleteManyArgs>(args?: SelectSubset<T, ActionLogItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionLogItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActionLogItems
     * const actionLogItem = await prisma.actionLogItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActionLogItemUpdateManyArgs>(args: SelectSubset<T, ActionLogItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionLogItems and returns the data updated in the database.
     * @param {ActionLogItemUpdateManyAndReturnArgs} args - Arguments to update many ActionLogItems.
     * @example
     * // Update many ActionLogItems
     * const actionLogItem = await prisma.actionLogItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActionLogItems and only return the `id`
     * const actionLogItemWithIdOnly = await prisma.actionLogItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActionLogItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ActionLogItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActionLogItem.
     * @param {ActionLogItemUpsertArgs} args - Arguments to update or create a ActionLogItem.
     * @example
     * // Update or create a ActionLogItem
     * const actionLogItem = await prisma.actionLogItem.upsert({
     *   create: {
     *     // ... data to create a ActionLogItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActionLogItem we want to update
     *   }
     * })
     */
    upsert<T extends ActionLogItemUpsertArgs>(args: SelectSubset<T, ActionLogItemUpsertArgs<ExtArgs>>): Prisma__ActionLogItemClient<$Result.GetResult<Prisma.$ActionLogItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActionLogItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogItemCountArgs} args - Arguments to filter ActionLogItems to count.
     * @example
     * // Count the number of ActionLogItems
     * const count = await prisma.actionLogItem.count({
     *   where: {
     *     // ... the filter for the ActionLogItems we want to count
     *   }
     * })
    **/
    count<T extends ActionLogItemCountArgs>(
      args?: Subset<T, ActionLogItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActionLogItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActionLogItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActionLogItemAggregateArgs>(args: Subset<T, ActionLogItemAggregateArgs>): Prisma.PrismaPromise<GetActionLogItemAggregateType<T>>

    /**
     * Group by ActionLogItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActionLogItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActionLogItemGroupByArgs['orderBy'] }
        : { orderBy?: ActionLogItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActionLogItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActionLogItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActionLogItem model
   */
  readonly fields: ActionLogItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActionLogItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActionLogItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    site<T extends WordPressSiteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WordPressSiteDefaultArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends ActionLogItem$userArgs<ExtArgs> = {}>(args?: Subset<T, ActionLogItem$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActionLogItem model
   */
  interface ActionLogItemFieldRefs {
    readonly id: FieldRef<"ActionLogItem", 'String'>
    readonly siteId: FieldRef<"ActionLogItem", 'String'>
    readonly userId: FieldRef<"ActionLogItem", 'String'>
    readonly actionTitle: FieldRef<"ActionLogItem", 'String'>
    readonly targetEntity: FieldRef<"ActionLogItem", 'String'>
    readonly executedBy: FieldRef<"ActionLogItem", 'String'>
    readonly timestamp: FieldRef<"ActionLogItem", 'DateTime'>
    readonly executionState: FieldRef<"ActionLogItem", 'String'>
    readonly verificationStatus: FieldRef<"ActionLogItem", 'String'>
    readonly rollbackStatus: FieldRef<"ActionLogItem", 'String'>
    readonly rollbackConfidence: FieldRef<"ActionLogItem", 'String'>
    readonly checksum: FieldRef<"ActionLogItem", 'String'>
    readonly snapshotData: FieldRef<"ActionLogItem", 'Json'>
    readonly sideEffects: FieldRef<"ActionLogItem", 'Json'>
    readonly createdAt: FieldRef<"ActionLogItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActionLogItem findUnique
   */
  export type ActionLogItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionLogItem to fetch.
     */
    where: ActionLogItemWhereUniqueInput
  }

  /**
   * ActionLogItem findUniqueOrThrow
   */
  export type ActionLogItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionLogItem to fetch.
     */
    where: ActionLogItemWhereUniqueInput
  }

  /**
   * ActionLogItem findFirst
   */
  export type ActionLogItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionLogItem to fetch.
     */
    where?: ActionLogItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionLogItems to fetch.
     */
    orderBy?: ActionLogItemOrderByWithRelationInput | ActionLogItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionLogItems.
     */
    cursor?: ActionLogItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionLogItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionLogItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionLogItems.
     */
    distinct?: ActionLogItemScalarFieldEnum | ActionLogItemScalarFieldEnum[]
  }

  /**
   * ActionLogItem findFirstOrThrow
   */
  export type ActionLogItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionLogItem to fetch.
     */
    where?: ActionLogItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionLogItems to fetch.
     */
    orderBy?: ActionLogItemOrderByWithRelationInput | ActionLogItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionLogItems.
     */
    cursor?: ActionLogItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionLogItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionLogItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionLogItems.
     */
    distinct?: ActionLogItemScalarFieldEnum | ActionLogItemScalarFieldEnum[]
  }

  /**
   * ActionLogItem findMany
   */
  export type ActionLogItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionLogItems to fetch.
     */
    where?: ActionLogItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionLogItems to fetch.
     */
    orderBy?: ActionLogItemOrderByWithRelationInput | ActionLogItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActionLogItems.
     */
    cursor?: ActionLogItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionLogItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionLogItems.
     */
    skip?: number
    distinct?: ActionLogItemScalarFieldEnum | ActionLogItemScalarFieldEnum[]
  }

  /**
   * ActionLogItem create
   */
  export type ActionLogItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ActionLogItem.
     */
    data: XOR<ActionLogItemCreateInput, ActionLogItemUncheckedCreateInput>
  }

  /**
   * ActionLogItem createMany
   */
  export type ActionLogItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActionLogItems.
     */
    data: ActionLogItemCreateManyInput | ActionLogItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActionLogItem createManyAndReturn
   */
  export type ActionLogItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * The data used to create many ActionLogItems.
     */
    data: ActionLogItemCreateManyInput | ActionLogItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionLogItem update
   */
  export type ActionLogItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ActionLogItem.
     */
    data: XOR<ActionLogItemUpdateInput, ActionLogItemUncheckedUpdateInput>
    /**
     * Choose, which ActionLogItem to update.
     */
    where: ActionLogItemWhereUniqueInput
  }

  /**
   * ActionLogItem updateMany
   */
  export type ActionLogItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActionLogItems.
     */
    data: XOR<ActionLogItemUpdateManyMutationInput, ActionLogItemUncheckedUpdateManyInput>
    /**
     * Filter which ActionLogItems to update
     */
    where?: ActionLogItemWhereInput
    /**
     * Limit how many ActionLogItems to update.
     */
    limit?: number
  }

  /**
   * ActionLogItem updateManyAndReturn
   */
  export type ActionLogItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * The data used to update ActionLogItems.
     */
    data: XOR<ActionLogItemUpdateManyMutationInput, ActionLogItemUncheckedUpdateManyInput>
    /**
     * Filter which ActionLogItems to update
     */
    where?: ActionLogItemWhereInput
    /**
     * Limit how many ActionLogItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionLogItem upsert
   */
  export type ActionLogItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ActionLogItem to update in case it exists.
     */
    where: ActionLogItemWhereUniqueInput
    /**
     * In case the ActionLogItem found by the `where` argument doesn't exist, create a new ActionLogItem with this data.
     */
    create: XOR<ActionLogItemCreateInput, ActionLogItemUncheckedCreateInput>
    /**
     * In case the ActionLogItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActionLogItemUpdateInput, ActionLogItemUncheckedUpdateInput>
  }

  /**
   * ActionLogItem delete
   */
  export type ActionLogItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
    /**
     * Filter which ActionLogItem to delete.
     */
    where: ActionLogItemWhereUniqueInput
  }

  /**
   * ActionLogItem deleteMany
   */
  export type ActionLogItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionLogItems to delete
     */
    where?: ActionLogItemWhereInput
    /**
     * Limit how many ActionLogItems to delete.
     */
    limit?: number
  }

  /**
   * ActionLogItem.user
   */
  export type ActionLogItem$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ActionLogItem without action
   */
  export type ActionLogItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLogItem
     */
    select?: ActionLogItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLogItem
     */
    omit?: ActionLogItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogItemInclude<ExtArgs> | null
  }


  /**
   * Model SiteAuditSummary
   */

  export type AggregateSiteAuditSummary = {
    _count: SiteAuditSummaryCountAggregateOutputType | null
    _avg: SiteAuditSummaryAvgAggregateOutputType | null
    _sum: SiteAuditSummarySumAggregateOutputType | null
    _min: SiteAuditSummaryMinAggregateOutputType | null
    _max: SiteAuditSummaryMaxAggregateOutputType | null
  }

  export type SiteAuditSummaryAvgAggregateOutputType = {
    overallScore: number | null
    seoScore: number | null
    contentScore: number | null
    technicalScore: number | null
    totalIssuesCount: number | null
    criticalIssuesCount: number | null
    warningIssuesCount: number | null
    infoIssuesCount: number | null
  }

  export type SiteAuditSummarySumAggregateOutputType = {
    overallScore: number | null
    seoScore: number | null
    contentScore: number | null
    technicalScore: number | null
    totalIssuesCount: number | null
    criticalIssuesCount: number | null
    warningIssuesCount: number | null
    infoIssuesCount: number | null
  }

  export type SiteAuditSummaryMinAggregateOutputType = {
    id: string | null
    siteId: string | null
    overallScore: number | null
    seoScore: number | null
    contentScore: number | null
    technicalScore: number | null
    auditDate: Date | null
    totalIssuesCount: number | null
    criticalIssuesCount: number | null
    warningIssuesCount: number | null
    infoIssuesCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiteAuditSummaryMaxAggregateOutputType = {
    id: string | null
    siteId: string | null
    overallScore: number | null
    seoScore: number | null
    contentScore: number | null
    technicalScore: number | null
    auditDate: Date | null
    totalIssuesCount: number | null
    criticalIssuesCount: number | null
    warningIssuesCount: number | null
    infoIssuesCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiteAuditSummaryCountAggregateOutputType = {
    id: number
    siteId: number
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate: number
    totalIssuesCount: number
    criticalIssuesCount: number
    warningIssuesCount: number
    infoIssuesCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SiteAuditSummaryAvgAggregateInputType = {
    overallScore?: true
    seoScore?: true
    contentScore?: true
    technicalScore?: true
    totalIssuesCount?: true
    criticalIssuesCount?: true
    warningIssuesCount?: true
    infoIssuesCount?: true
  }

  export type SiteAuditSummarySumAggregateInputType = {
    overallScore?: true
    seoScore?: true
    contentScore?: true
    technicalScore?: true
    totalIssuesCount?: true
    criticalIssuesCount?: true
    warningIssuesCount?: true
    infoIssuesCount?: true
  }

  export type SiteAuditSummaryMinAggregateInputType = {
    id?: true
    siteId?: true
    overallScore?: true
    seoScore?: true
    contentScore?: true
    technicalScore?: true
    auditDate?: true
    totalIssuesCount?: true
    criticalIssuesCount?: true
    warningIssuesCount?: true
    infoIssuesCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiteAuditSummaryMaxAggregateInputType = {
    id?: true
    siteId?: true
    overallScore?: true
    seoScore?: true
    contentScore?: true
    technicalScore?: true
    auditDate?: true
    totalIssuesCount?: true
    criticalIssuesCount?: true
    warningIssuesCount?: true
    infoIssuesCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiteAuditSummaryCountAggregateInputType = {
    id?: true
    siteId?: true
    overallScore?: true
    seoScore?: true
    contentScore?: true
    technicalScore?: true
    auditDate?: true
    totalIssuesCount?: true
    criticalIssuesCount?: true
    warningIssuesCount?: true
    infoIssuesCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteAuditSummaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteAuditSummary to aggregate.
     */
    where?: SiteAuditSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteAuditSummaries to fetch.
     */
    orderBy?: SiteAuditSummaryOrderByWithRelationInput | SiteAuditSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteAuditSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteAuditSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteAuditSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteAuditSummaries
    **/
    _count?: true | SiteAuditSummaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SiteAuditSummaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SiteAuditSummarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteAuditSummaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteAuditSummaryMaxAggregateInputType
  }

  export type GetSiteAuditSummaryAggregateType<T extends SiteAuditSummaryAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteAuditSummary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteAuditSummary[P]>
      : GetScalarType<T[P], AggregateSiteAuditSummary[P]>
  }




  export type SiteAuditSummaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteAuditSummaryWhereInput
    orderBy?: SiteAuditSummaryOrderByWithAggregationInput | SiteAuditSummaryOrderByWithAggregationInput[]
    by: SiteAuditSummaryScalarFieldEnum[] | SiteAuditSummaryScalarFieldEnum
    having?: SiteAuditSummaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteAuditSummaryCountAggregateInputType | true
    _avg?: SiteAuditSummaryAvgAggregateInputType
    _sum?: SiteAuditSummarySumAggregateInputType
    _min?: SiteAuditSummaryMinAggregateInputType
    _max?: SiteAuditSummaryMaxAggregateInputType
  }

  export type SiteAuditSummaryGroupByOutputType = {
    id: string
    siteId: string
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate: Date
    totalIssuesCount: number
    criticalIssuesCount: number
    warningIssuesCount: number
    infoIssuesCount: number
    createdAt: Date
    updatedAt: Date
    _count: SiteAuditSummaryCountAggregateOutputType | null
    _avg: SiteAuditSummaryAvgAggregateOutputType | null
    _sum: SiteAuditSummarySumAggregateOutputType | null
    _min: SiteAuditSummaryMinAggregateOutputType | null
    _max: SiteAuditSummaryMaxAggregateOutputType | null
  }

  type GetSiteAuditSummaryGroupByPayload<T extends SiteAuditSummaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteAuditSummaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteAuditSummaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteAuditSummaryGroupByOutputType[P]>
            : GetScalarType<T[P], SiteAuditSummaryGroupByOutputType[P]>
        }
      >
    >


  export type SiteAuditSummarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteId?: boolean
    overallScore?: boolean
    seoScore?: boolean
    contentScore?: boolean
    technicalScore?: boolean
    auditDate?: boolean
    totalIssuesCount?: boolean
    criticalIssuesCount?: boolean
    warningIssuesCount?: boolean
    infoIssuesCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    issues?: boolean | SiteAuditSummary$issuesArgs<ExtArgs>
    _count?: boolean | SiteAuditSummaryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siteAuditSummary"]>

  export type SiteAuditSummarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteId?: boolean
    overallScore?: boolean
    seoScore?: boolean
    contentScore?: boolean
    technicalScore?: boolean
    auditDate?: boolean
    totalIssuesCount?: boolean
    criticalIssuesCount?: boolean
    warningIssuesCount?: boolean
    infoIssuesCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siteAuditSummary"]>

  export type SiteAuditSummarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteId?: boolean
    overallScore?: boolean
    seoScore?: boolean
    contentScore?: boolean
    technicalScore?: boolean
    auditDate?: boolean
    totalIssuesCount?: boolean
    criticalIssuesCount?: boolean
    warningIssuesCount?: boolean
    infoIssuesCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siteAuditSummary"]>

  export type SiteAuditSummarySelectScalar = {
    id?: boolean
    siteId?: boolean
    overallScore?: boolean
    seoScore?: boolean
    contentScore?: boolean
    technicalScore?: boolean
    auditDate?: boolean
    totalIssuesCount?: boolean
    criticalIssuesCount?: boolean
    warningIssuesCount?: boolean
    infoIssuesCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SiteAuditSummaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "siteId" | "overallScore" | "seoScore" | "contentScore" | "technicalScore" | "auditDate" | "totalIssuesCount" | "criticalIssuesCount" | "warningIssuesCount" | "infoIssuesCount" | "createdAt" | "updatedAt", ExtArgs["result"]["siteAuditSummary"]>
  export type SiteAuditSummaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
    issues?: boolean | SiteAuditSummary$issuesArgs<ExtArgs>
    _count?: boolean | SiteAuditSummaryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SiteAuditSummaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
  }
  export type SiteAuditSummaryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | WordPressSiteDefaultArgs<ExtArgs>
  }

  export type $SiteAuditSummaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteAuditSummary"
    objects: {
      site: Prisma.$WordPressSitePayload<ExtArgs>
      issues: Prisma.$AuditIssuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      siteId: string
      overallScore: number
      seoScore: number
      contentScore: number
      technicalScore: number
      auditDate: Date
      totalIssuesCount: number
      criticalIssuesCount: number
      warningIssuesCount: number
      infoIssuesCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["siteAuditSummary"]>
    composites: {}
  }

  type SiteAuditSummaryGetPayload<S extends boolean | null | undefined | SiteAuditSummaryDefaultArgs> = $Result.GetResult<Prisma.$SiteAuditSummaryPayload, S>

  type SiteAuditSummaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteAuditSummaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteAuditSummaryCountAggregateInputType | true
    }

  export interface SiteAuditSummaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteAuditSummary'], meta: { name: 'SiteAuditSummary' } }
    /**
     * Find zero or one SiteAuditSummary that matches the filter.
     * @param {SiteAuditSummaryFindUniqueArgs} args - Arguments to find a SiteAuditSummary
     * @example
     * // Get one SiteAuditSummary
     * const siteAuditSummary = await prisma.siteAuditSummary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteAuditSummaryFindUniqueArgs>(args: SelectSubset<T, SiteAuditSummaryFindUniqueArgs<ExtArgs>>): Prisma__SiteAuditSummaryClient<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SiteAuditSummary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteAuditSummaryFindUniqueOrThrowArgs} args - Arguments to find a SiteAuditSummary
     * @example
     * // Get one SiteAuditSummary
     * const siteAuditSummary = await prisma.siteAuditSummary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteAuditSummaryFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteAuditSummaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteAuditSummaryClient<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteAuditSummary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteAuditSummaryFindFirstArgs} args - Arguments to find a SiteAuditSummary
     * @example
     * // Get one SiteAuditSummary
     * const siteAuditSummary = await prisma.siteAuditSummary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteAuditSummaryFindFirstArgs>(args?: SelectSubset<T, SiteAuditSummaryFindFirstArgs<ExtArgs>>): Prisma__SiteAuditSummaryClient<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteAuditSummary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteAuditSummaryFindFirstOrThrowArgs} args - Arguments to find a SiteAuditSummary
     * @example
     * // Get one SiteAuditSummary
     * const siteAuditSummary = await prisma.siteAuditSummary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteAuditSummaryFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteAuditSummaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteAuditSummaryClient<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SiteAuditSummaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteAuditSummaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteAuditSummaries
     * const siteAuditSummaries = await prisma.siteAuditSummary.findMany()
     * 
     * // Get first 10 SiteAuditSummaries
     * const siteAuditSummaries = await prisma.siteAuditSummary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteAuditSummaryWithIdOnly = await prisma.siteAuditSummary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteAuditSummaryFindManyArgs>(args?: SelectSubset<T, SiteAuditSummaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SiteAuditSummary.
     * @param {SiteAuditSummaryCreateArgs} args - Arguments to create a SiteAuditSummary.
     * @example
     * // Create one SiteAuditSummary
     * const SiteAuditSummary = await prisma.siteAuditSummary.create({
     *   data: {
     *     // ... data to create a SiteAuditSummary
     *   }
     * })
     * 
     */
    create<T extends SiteAuditSummaryCreateArgs>(args: SelectSubset<T, SiteAuditSummaryCreateArgs<ExtArgs>>): Prisma__SiteAuditSummaryClient<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SiteAuditSummaries.
     * @param {SiteAuditSummaryCreateManyArgs} args - Arguments to create many SiteAuditSummaries.
     * @example
     * // Create many SiteAuditSummaries
     * const siteAuditSummary = await prisma.siteAuditSummary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteAuditSummaryCreateManyArgs>(args?: SelectSubset<T, SiteAuditSummaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteAuditSummaries and returns the data saved in the database.
     * @param {SiteAuditSummaryCreateManyAndReturnArgs} args - Arguments to create many SiteAuditSummaries.
     * @example
     * // Create many SiteAuditSummaries
     * const siteAuditSummary = await prisma.siteAuditSummary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteAuditSummaries and only return the `id`
     * const siteAuditSummaryWithIdOnly = await prisma.siteAuditSummary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteAuditSummaryCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteAuditSummaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SiteAuditSummary.
     * @param {SiteAuditSummaryDeleteArgs} args - Arguments to delete one SiteAuditSummary.
     * @example
     * // Delete one SiteAuditSummary
     * const SiteAuditSummary = await prisma.siteAuditSummary.delete({
     *   where: {
     *     // ... filter to delete one SiteAuditSummary
     *   }
     * })
     * 
     */
    delete<T extends SiteAuditSummaryDeleteArgs>(args: SelectSubset<T, SiteAuditSummaryDeleteArgs<ExtArgs>>): Prisma__SiteAuditSummaryClient<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SiteAuditSummary.
     * @param {SiteAuditSummaryUpdateArgs} args - Arguments to update one SiteAuditSummary.
     * @example
     * // Update one SiteAuditSummary
     * const siteAuditSummary = await prisma.siteAuditSummary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteAuditSummaryUpdateArgs>(args: SelectSubset<T, SiteAuditSummaryUpdateArgs<ExtArgs>>): Prisma__SiteAuditSummaryClient<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SiteAuditSummaries.
     * @param {SiteAuditSummaryDeleteManyArgs} args - Arguments to filter SiteAuditSummaries to delete.
     * @example
     * // Delete a few SiteAuditSummaries
     * const { count } = await prisma.siteAuditSummary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteAuditSummaryDeleteManyArgs>(args?: SelectSubset<T, SiteAuditSummaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteAuditSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteAuditSummaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteAuditSummaries
     * const siteAuditSummary = await prisma.siteAuditSummary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteAuditSummaryUpdateManyArgs>(args: SelectSubset<T, SiteAuditSummaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteAuditSummaries and returns the data updated in the database.
     * @param {SiteAuditSummaryUpdateManyAndReturnArgs} args - Arguments to update many SiteAuditSummaries.
     * @example
     * // Update many SiteAuditSummaries
     * const siteAuditSummary = await prisma.siteAuditSummary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SiteAuditSummaries and only return the `id`
     * const siteAuditSummaryWithIdOnly = await prisma.siteAuditSummary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiteAuditSummaryUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteAuditSummaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SiteAuditSummary.
     * @param {SiteAuditSummaryUpsertArgs} args - Arguments to update or create a SiteAuditSummary.
     * @example
     * // Update or create a SiteAuditSummary
     * const siteAuditSummary = await prisma.siteAuditSummary.upsert({
     *   create: {
     *     // ... data to create a SiteAuditSummary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteAuditSummary we want to update
     *   }
     * })
     */
    upsert<T extends SiteAuditSummaryUpsertArgs>(args: SelectSubset<T, SiteAuditSummaryUpsertArgs<ExtArgs>>): Prisma__SiteAuditSummaryClient<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SiteAuditSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteAuditSummaryCountArgs} args - Arguments to filter SiteAuditSummaries to count.
     * @example
     * // Count the number of SiteAuditSummaries
     * const count = await prisma.siteAuditSummary.count({
     *   where: {
     *     // ... the filter for the SiteAuditSummaries we want to count
     *   }
     * })
    **/
    count<T extends SiteAuditSummaryCountArgs>(
      args?: Subset<T, SiteAuditSummaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteAuditSummaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteAuditSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteAuditSummaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteAuditSummaryAggregateArgs>(args: Subset<T, SiteAuditSummaryAggregateArgs>): Prisma.PrismaPromise<GetSiteAuditSummaryAggregateType<T>>

    /**
     * Group by SiteAuditSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteAuditSummaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteAuditSummaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteAuditSummaryGroupByArgs['orderBy'] }
        : { orderBy?: SiteAuditSummaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteAuditSummaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteAuditSummaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteAuditSummary model
   */
  readonly fields: SiteAuditSummaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteAuditSummary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteAuditSummaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    site<T extends WordPressSiteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WordPressSiteDefaultArgs<ExtArgs>>): Prisma__WordPressSiteClient<$Result.GetResult<Prisma.$WordPressSitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    issues<T extends SiteAuditSummary$issuesArgs<ExtArgs> = {}>(args?: Subset<T, SiteAuditSummary$issuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SiteAuditSummary model
   */
  interface SiteAuditSummaryFieldRefs {
    readonly id: FieldRef<"SiteAuditSummary", 'String'>
    readonly siteId: FieldRef<"SiteAuditSummary", 'String'>
    readonly overallScore: FieldRef<"SiteAuditSummary", 'Int'>
    readonly seoScore: FieldRef<"SiteAuditSummary", 'Int'>
    readonly contentScore: FieldRef<"SiteAuditSummary", 'Int'>
    readonly technicalScore: FieldRef<"SiteAuditSummary", 'Int'>
    readonly auditDate: FieldRef<"SiteAuditSummary", 'DateTime'>
    readonly totalIssuesCount: FieldRef<"SiteAuditSummary", 'Int'>
    readonly criticalIssuesCount: FieldRef<"SiteAuditSummary", 'Int'>
    readonly warningIssuesCount: FieldRef<"SiteAuditSummary", 'Int'>
    readonly infoIssuesCount: FieldRef<"SiteAuditSummary", 'Int'>
    readonly createdAt: FieldRef<"SiteAuditSummary", 'DateTime'>
    readonly updatedAt: FieldRef<"SiteAuditSummary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SiteAuditSummary findUnique
   */
  export type SiteAuditSummaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    /**
     * Filter, which SiteAuditSummary to fetch.
     */
    where: SiteAuditSummaryWhereUniqueInput
  }

  /**
   * SiteAuditSummary findUniqueOrThrow
   */
  export type SiteAuditSummaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    /**
     * Filter, which SiteAuditSummary to fetch.
     */
    where: SiteAuditSummaryWhereUniqueInput
  }

  /**
   * SiteAuditSummary findFirst
   */
  export type SiteAuditSummaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    /**
     * Filter, which SiteAuditSummary to fetch.
     */
    where?: SiteAuditSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteAuditSummaries to fetch.
     */
    orderBy?: SiteAuditSummaryOrderByWithRelationInput | SiteAuditSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteAuditSummaries.
     */
    cursor?: SiteAuditSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteAuditSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteAuditSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteAuditSummaries.
     */
    distinct?: SiteAuditSummaryScalarFieldEnum | SiteAuditSummaryScalarFieldEnum[]
  }

  /**
   * SiteAuditSummary findFirstOrThrow
   */
  export type SiteAuditSummaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    /**
     * Filter, which SiteAuditSummary to fetch.
     */
    where?: SiteAuditSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteAuditSummaries to fetch.
     */
    orderBy?: SiteAuditSummaryOrderByWithRelationInput | SiteAuditSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteAuditSummaries.
     */
    cursor?: SiteAuditSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteAuditSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteAuditSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteAuditSummaries.
     */
    distinct?: SiteAuditSummaryScalarFieldEnum | SiteAuditSummaryScalarFieldEnum[]
  }

  /**
   * SiteAuditSummary findMany
   */
  export type SiteAuditSummaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    /**
     * Filter, which SiteAuditSummaries to fetch.
     */
    where?: SiteAuditSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteAuditSummaries to fetch.
     */
    orderBy?: SiteAuditSummaryOrderByWithRelationInput | SiteAuditSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteAuditSummaries.
     */
    cursor?: SiteAuditSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteAuditSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteAuditSummaries.
     */
    skip?: number
    distinct?: SiteAuditSummaryScalarFieldEnum | SiteAuditSummaryScalarFieldEnum[]
  }

  /**
   * SiteAuditSummary create
   */
  export type SiteAuditSummaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    /**
     * The data needed to create a SiteAuditSummary.
     */
    data: XOR<SiteAuditSummaryCreateInput, SiteAuditSummaryUncheckedCreateInput>
  }

  /**
   * SiteAuditSummary createMany
   */
  export type SiteAuditSummaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteAuditSummaries.
     */
    data: SiteAuditSummaryCreateManyInput | SiteAuditSummaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteAuditSummary createManyAndReturn
   */
  export type SiteAuditSummaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * The data used to create many SiteAuditSummaries.
     */
    data: SiteAuditSummaryCreateManyInput | SiteAuditSummaryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SiteAuditSummary update
   */
  export type SiteAuditSummaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    /**
     * The data needed to update a SiteAuditSummary.
     */
    data: XOR<SiteAuditSummaryUpdateInput, SiteAuditSummaryUncheckedUpdateInput>
    /**
     * Choose, which SiteAuditSummary to update.
     */
    where: SiteAuditSummaryWhereUniqueInput
  }

  /**
   * SiteAuditSummary updateMany
   */
  export type SiteAuditSummaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteAuditSummaries.
     */
    data: XOR<SiteAuditSummaryUpdateManyMutationInput, SiteAuditSummaryUncheckedUpdateManyInput>
    /**
     * Filter which SiteAuditSummaries to update
     */
    where?: SiteAuditSummaryWhereInput
    /**
     * Limit how many SiteAuditSummaries to update.
     */
    limit?: number
  }

  /**
   * SiteAuditSummary updateManyAndReturn
   */
  export type SiteAuditSummaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * The data used to update SiteAuditSummaries.
     */
    data: XOR<SiteAuditSummaryUpdateManyMutationInput, SiteAuditSummaryUncheckedUpdateManyInput>
    /**
     * Filter which SiteAuditSummaries to update
     */
    where?: SiteAuditSummaryWhereInput
    /**
     * Limit how many SiteAuditSummaries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SiteAuditSummary upsert
   */
  export type SiteAuditSummaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    /**
     * The filter to search for the SiteAuditSummary to update in case it exists.
     */
    where: SiteAuditSummaryWhereUniqueInput
    /**
     * In case the SiteAuditSummary found by the `where` argument doesn't exist, create a new SiteAuditSummary with this data.
     */
    create: XOR<SiteAuditSummaryCreateInput, SiteAuditSummaryUncheckedCreateInput>
    /**
     * In case the SiteAuditSummary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteAuditSummaryUpdateInput, SiteAuditSummaryUncheckedUpdateInput>
  }

  /**
   * SiteAuditSummary delete
   */
  export type SiteAuditSummaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
    /**
     * Filter which SiteAuditSummary to delete.
     */
    where: SiteAuditSummaryWhereUniqueInput
  }

  /**
   * SiteAuditSummary deleteMany
   */
  export type SiteAuditSummaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteAuditSummaries to delete
     */
    where?: SiteAuditSummaryWhereInput
    /**
     * Limit how many SiteAuditSummaries to delete.
     */
    limit?: number
  }

  /**
   * SiteAuditSummary.issues
   */
  export type SiteAuditSummary$issuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    where?: AuditIssueWhereInput
    orderBy?: AuditIssueOrderByWithRelationInput | AuditIssueOrderByWithRelationInput[]
    cursor?: AuditIssueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditIssueScalarFieldEnum | AuditIssueScalarFieldEnum[]
  }

  /**
   * SiteAuditSummary without action
   */
  export type SiteAuditSummaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteAuditSummary
     */
    select?: SiteAuditSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteAuditSummary
     */
    omit?: SiteAuditSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteAuditSummaryInclude<ExtArgs> | null
  }


  /**
   * Model AuditIssue
   */

  export type AggregateAuditIssue = {
    _count: AuditIssueCountAggregateOutputType | null
    _min: AuditIssueMinAggregateOutputType | null
    _max: AuditIssueMaxAggregateOutputType | null
  }

  export type AuditIssueMinAggregateOutputType = {
    id: string | null
    auditSummaryId: string | null
    category: string | null
    severity: string | null
    title: string | null
    description: string | null
    affectedUrl: string | null
    pageTitle: string | null
    recommendation: string | null
    autoFixable: boolean | null
    createdAt: Date | null
  }

  export type AuditIssueMaxAggregateOutputType = {
    id: string | null
    auditSummaryId: string | null
    category: string | null
    severity: string | null
    title: string | null
    description: string | null
    affectedUrl: string | null
    pageTitle: string | null
    recommendation: string | null
    autoFixable: boolean | null
    createdAt: Date | null
  }

  export type AuditIssueCountAggregateOutputType = {
    id: number
    auditSummaryId: number
    category: number
    severity: number
    title: number
    description: number
    affectedUrl: number
    pageTitle: number
    recommendation: number
    autoFixable: number
    actionPayload: number
    createdAt: number
    _all: number
  }


  export type AuditIssueMinAggregateInputType = {
    id?: true
    auditSummaryId?: true
    category?: true
    severity?: true
    title?: true
    description?: true
    affectedUrl?: true
    pageTitle?: true
    recommendation?: true
    autoFixable?: true
    createdAt?: true
  }

  export type AuditIssueMaxAggregateInputType = {
    id?: true
    auditSummaryId?: true
    category?: true
    severity?: true
    title?: true
    description?: true
    affectedUrl?: true
    pageTitle?: true
    recommendation?: true
    autoFixable?: true
    createdAt?: true
  }

  export type AuditIssueCountAggregateInputType = {
    id?: true
    auditSummaryId?: true
    category?: true
    severity?: true
    title?: true
    description?: true
    affectedUrl?: true
    pageTitle?: true
    recommendation?: true
    autoFixable?: true
    actionPayload?: true
    createdAt?: true
    _all?: true
  }

  export type AuditIssueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditIssue to aggregate.
     */
    where?: AuditIssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditIssues to fetch.
     */
    orderBy?: AuditIssueOrderByWithRelationInput | AuditIssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditIssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditIssues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditIssues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditIssues
    **/
    _count?: true | AuditIssueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditIssueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditIssueMaxAggregateInputType
  }

  export type GetAuditIssueAggregateType<T extends AuditIssueAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditIssue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditIssue[P]>
      : GetScalarType<T[P], AggregateAuditIssue[P]>
  }




  export type AuditIssueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditIssueWhereInput
    orderBy?: AuditIssueOrderByWithAggregationInput | AuditIssueOrderByWithAggregationInput[]
    by: AuditIssueScalarFieldEnum[] | AuditIssueScalarFieldEnum
    having?: AuditIssueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditIssueCountAggregateInputType | true
    _min?: AuditIssueMinAggregateInputType
    _max?: AuditIssueMaxAggregateInputType
  }

  export type AuditIssueGroupByOutputType = {
    id: string
    auditSummaryId: string
    category: string
    severity: string
    title: string
    description: string
    affectedUrl: string
    pageTitle: string
    recommendation: string
    autoFixable: boolean
    actionPayload: JsonValue | null
    createdAt: Date
    _count: AuditIssueCountAggregateOutputType | null
    _min: AuditIssueMinAggregateOutputType | null
    _max: AuditIssueMaxAggregateOutputType | null
  }

  type GetAuditIssueGroupByPayload<T extends AuditIssueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditIssueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditIssueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditIssueGroupByOutputType[P]>
            : GetScalarType<T[P], AuditIssueGroupByOutputType[P]>
        }
      >
    >


  export type AuditIssueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auditSummaryId?: boolean
    category?: boolean
    severity?: boolean
    title?: boolean
    description?: boolean
    affectedUrl?: boolean
    pageTitle?: boolean
    recommendation?: boolean
    autoFixable?: boolean
    actionPayload?: boolean
    createdAt?: boolean
    auditSummary?: boolean | SiteAuditSummaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditIssue"]>

  export type AuditIssueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auditSummaryId?: boolean
    category?: boolean
    severity?: boolean
    title?: boolean
    description?: boolean
    affectedUrl?: boolean
    pageTitle?: boolean
    recommendation?: boolean
    autoFixable?: boolean
    actionPayload?: boolean
    createdAt?: boolean
    auditSummary?: boolean | SiteAuditSummaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditIssue"]>

  export type AuditIssueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auditSummaryId?: boolean
    category?: boolean
    severity?: boolean
    title?: boolean
    description?: boolean
    affectedUrl?: boolean
    pageTitle?: boolean
    recommendation?: boolean
    autoFixable?: boolean
    actionPayload?: boolean
    createdAt?: boolean
    auditSummary?: boolean | SiteAuditSummaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditIssue"]>

  export type AuditIssueSelectScalar = {
    id?: boolean
    auditSummaryId?: boolean
    category?: boolean
    severity?: boolean
    title?: boolean
    description?: boolean
    affectedUrl?: boolean
    pageTitle?: boolean
    recommendation?: boolean
    autoFixable?: boolean
    actionPayload?: boolean
    createdAt?: boolean
  }

  export type AuditIssueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "auditSummaryId" | "category" | "severity" | "title" | "description" | "affectedUrl" | "pageTitle" | "recommendation" | "autoFixable" | "actionPayload" | "createdAt", ExtArgs["result"]["auditIssue"]>
  export type AuditIssueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditSummary?: boolean | SiteAuditSummaryDefaultArgs<ExtArgs>
  }
  export type AuditIssueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditSummary?: boolean | SiteAuditSummaryDefaultArgs<ExtArgs>
  }
  export type AuditIssueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditSummary?: boolean | SiteAuditSummaryDefaultArgs<ExtArgs>
  }

  export type $AuditIssuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditIssue"
    objects: {
      auditSummary: Prisma.$SiteAuditSummaryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      auditSummaryId: string
      category: string
      severity: string
      title: string
      description: string
      affectedUrl: string
      pageTitle: string
      recommendation: string
      autoFixable: boolean
      actionPayload: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditIssue"]>
    composites: {}
  }

  type AuditIssueGetPayload<S extends boolean | null | undefined | AuditIssueDefaultArgs> = $Result.GetResult<Prisma.$AuditIssuePayload, S>

  type AuditIssueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditIssueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditIssueCountAggregateInputType | true
    }

  export interface AuditIssueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditIssue'], meta: { name: 'AuditIssue' } }
    /**
     * Find zero or one AuditIssue that matches the filter.
     * @param {AuditIssueFindUniqueArgs} args - Arguments to find a AuditIssue
     * @example
     * // Get one AuditIssue
     * const auditIssue = await prisma.auditIssue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditIssueFindUniqueArgs>(args: SelectSubset<T, AuditIssueFindUniqueArgs<ExtArgs>>): Prisma__AuditIssueClient<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditIssue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditIssueFindUniqueOrThrowArgs} args - Arguments to find a AuditIssue
     * @example
     * // Get one AuditIssue
     * const auditIssue = await prisma.auditIssue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditIssueFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditIssueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditIssueClient<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditIssue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditIssueFindFirstArgs} args - Arguments to find a AuditIssue
     * @example
     * // Get one AuditIssue
     * const auditIssue = await prisma.auditIssue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditIssueFindFirstArgs>(args?: SelectSubset<T, AuditIssueFindFirstArgs<ExtArgs>>): Prisma__AuditIssueClient<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditIssue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditIssueFindFirstOrThrowArgs} args - Arguments to find a AuditIssue
     * @example
     * // Get one AuditIssue
     * const auditIssue = await prisma.auditIssue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditIssueFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditIssueFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditIssueClient<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditIssues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditIssueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditIssues
     * const auditIssues = await prisma.auditIssue.findMany()
     * 
     * // Get first 10 AuditIssues
     * const auditIssues = await prisma.auditIssue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditIssueWithIdOnly = await prisma.auditIssue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditIssueFindManyArgs>(args?: SelectSubset<T, AuditIssueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditIssue.
     * @param {AuditIssueCreateArgs} args - Arguments to create a AuditIssue.
     * @example
     * // Create one AuditIssue
     * const AuditIssue = await prisma.auditIssue.create({
     *   data: {
     *     // ... data to create a AuditIssue
     *   }
     * })
     * 
     */
    create<T extends AuditIssueCreateArgs>(args: SelectSubset<T, AuditIssueCreateArgs<ExtArgs>>): Prisma__AuditIssueClient<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditIssues.
     * @param {AuditIssueCreateManyArgs} args - Arguments to create many AuditIssues.
     * @example
     * // Create many AuditIssues
     * const auditIssue = await prisma.auditIssue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditIssueCreateManyArgs>(args?: SelectSubset<T, AuditIssueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditIssues and returns the data saved in the database.
     * @param {AuditIssueCreateManyAndReturnArgs} args - Arguments to create many AuditIssues.
     * @example
     * // Create many AuditIssues
     * const auditIssue = await prisma.auditIssue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditIssues and only return the `id`
     * const auditIssueWithIdOnly = await prisma.auditIssue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditIssueCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditIssueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditIssue.
     * @param {AuditIssueDeleteArgs} args - Arguments to delete one AuditIssue.
     * @example
     * // Delete one AuditIssue
     * const AuditIssue = await prisma.auditIssue.delete({
     *   where: {
     *     // ... filter to delete one AuditIssue
     *   }
     * })
     * 
     */
    delete<T extends AuditIssueDeleteArgs>(args: SelectSubset<T, AuditIssueDeleteArgs<ExtArgs>>): Prisma__AuditIssueClient<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditIssue.
     * @param {AuditIssueUpdateArgs} args - Arguments to update one AuditIssue.
     * @example
     * // Update one AuditIssue
     * const auditIssue = await prisma.auditIssue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditIssueUpdateArgs>(args: SelectSubset<T, AuditIssueUpdateArgs<ExtArgs>>): Prisma__AuditIssueClient<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditIssues.
     * @param {AuditIssueDeleteManyArgs} args - Arguments to filter AuditIssues to delete.
     * @example
     * // Delete a few AuditIssues
     * const { count } = await prisma.auditIssue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditIssueDeleteManyArgs>(args?: SelectSubset<T, AuditIssueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditIssues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditIssueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditIssues
     * const auditIssue = await prisma.auditIssue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditIssueUpdateManyArgs>(args: SelectSubset<T, AuditIssueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditIssues and returns the data updated in the database.
     * @param {AuditIssueUpdateManyAndReturnArgs} args - Arguments to update many AuditIssues.
     * @example
     * // Update many AuditIssues
     * const auditIssue = await prisma.auditIssue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditIssues and only return the `id`
     * const auditIssueWithIdOnly = await prisma.auditIssue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditIssueUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditIssueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditIssue.
     * @param {AuditIssueUpsertArgs} args - Arguments to update or create a AuditIssue.
     * @example
     * // Update or create a AuditIssue
     * const auditIssue = await prisma.auditIssue.upsert({
     *   create: {
     *     // ... data to create a AuditIssue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditIssue we want to update
     *   }
     * })
     */
    upsert<T extends AuditIssueUpsertArgs>(args: SelectSubset<T, AuditIssueUpsertArgs<ExtArgs>>): Prisma__AuditIssueClient<$Result.GetResult<Prisma.$AuditIssuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditIssues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditIssueCountArgs} args - Arguments to filter AuditIssues to count.
     * @example
     * // Count the number of AuditIssues
     * const count = await prisma.auditIssue.count({
     *   where: {
     *     // ... the filter for the AuditIssues we want to count
     *   }
     * })
    **/
    count<T extends AuditIssueCountArgs>(
      args?: Subset<T, AuditIssueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditIssueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditIssue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditIssueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditIssueAggregateArgs>(args: Subset<T, AuditIssueAggregateArgs>): Prisma.PrismaPromise<GetAuditIssueAggregateType<T>>

    /**
     * Group by AuditIssue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditIssueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditIssueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditIssueGroupByArgs['orderBy'] }
        : { orderBy?: AuditIssueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditIssueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditIssueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditIssue model
   */
  readonly fields: AuditIssueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditIssue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditIssueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auditSummary<T extends SiteAuditSummaryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiteAuditSummaryDefaultArgs<ExtArgs>>): Prisma__SiteAuditSummaryClient<$Result.GetResult<Prisma.$SiteAuditSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditIssue model
   */
  interface AuditIssueFieldRefs {
    readonly id: FieldRef<"AuditIssue", 'String'>
    readonly auditSummaryId: FieldRef<"AuditIssue", 'String'>
    readonly category: FieldRef<"AuditIssue", 'String'>
    readonly severity: FieldRef<"AuditIssue", 'String'>
    readonly title: FieldRef<"AuditIssue", 'String'>
    readonly description: FieldRef<"AuditIssue", 'String'>
    readonly affectedUrl: FieldRef<"AuditIssue", 'String'>
    readonly pageTitle: FieldRef<"AuditIssue", 'String'>
    readonly recommendation: FieldRef<"AuditIssue", 'String'>
    readonly autoFixable: FieldRef<"AuditIssue", 'Boolean'>
    readonly actionPayload: FieldRef<"AuditIssue", 'Json'>
    readonly createdAt: FieldRef<"AuditIssue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditIssue findUnique
   */
  export type AuditIssueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    /**
     * Filter, which AuditIssue to fetch.
     */
    where: AuditIssueWhereUniqueInput
  }

  /**
   * AuditIssue findUniqueOrThrow
   */
  export type AuditIssueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    /**
     * Filter, which AuditIssue to fetch.
     */
    where: AuditIssueWhereUniqueInput
  }

  /**
   * AuditIssue findFirst
   */
  export type AuditIssueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    /**
     * Filter, which AuditIssue to fetch.
     */
    where?: AuditIssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditIssues to fetch.
     */
    orderBy?: AuditIssueOrderByWithRelationInput | AuditIssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditIssues.
     */
    cursor?: AuditIssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditIssues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditIssues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditIssues.
     */
    distinct?: AuditIssueScalarFieldEnum | AuditIssueScalarFieldEnum[]
  }

  /**
   * AuditIssue findFirstOrThrow
   */
  export type AuditIssueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    /**
     * Filter, which AuditIssue to fetch.
     */
    where?: AuditIssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditIssues to fetch.
     */
    orderBy?: AuditIssueOrderByWithRelationInput | AuditIssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditIssues.
     */
    cursor?: AuditIssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditIssues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditIssues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditIssues.
     */
    distinct?: AuditIssueScalarFieldEnum | AuditIssueScalarFieldEnum[]
  }

  /**
   * AuditIssue findMany
   */
  export type AuditIssueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    /**
     * Filter, which AuditIssues to fetch.
     */
    where?: AuditIssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditIssues to fetch.
     */
    orderBy?: AuditIssueOrderByWithRelationInput | AuditIssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditIssues.
     */
    cursor?: AuditIssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditIssues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditIssues.
     */
    skip?: number
    distinct?: AuditIssueScalarFieldEnum | AuditIssueScalarFieldEnum[]
  }

  /**
   * AuditIssue create
   */
  export type AuditIssueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditIssue.
     */
    data: XOR<AuditIssueCreateInput, AuditIssueUncheckedCreateInput>
  }

  /**
   * AuditIssue createMany
   */
  export type AuditIssueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditIssues.
     */
    data: AuditIssueCreateManyInput | AuditIssueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditIssue createManyAndReturn
   */
  export type AuditIssueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * The data used to create many AuditIssues.
     */
    data: AuditIssueCreateManyInput | AuditIssueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditIssue update
   */
  export type AuditIssueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditIssue.
     */
    data: XOR<AuditIssueUpdateInput, AuditIssueUncheckedUpdateInput>
    /**
     * Choose, which AuditIssue to update.
     */
    where: AuditIssueWhereUniqueInput
  }

  /**
   * AuditIssue updateMany
   */
  export type AuditIssueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditIssues.
     */
    data: XOR<AuditIssueUpdateManyMutationInput, AuditIssueUncheckedUpdateManyInput>
    /**
     * Filter which AuditIssues to update
     */
    where?: AuditIssueWhereInput
    /**
     * Limit how many AuditIssues to update.
     */
    limit?: number
  }

  /**
   * AuditIssue updateManyAndReturn
   */
  export type AuditIssueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * The data used to update AuditIssues.
     */
    data: XOR<AuditIssueUpdateManyMutationInput, AuditIssueUncheckedUpdateManyInput>
    /**
     * Filter which AuditIssues to update
     */
    where?: AuditIssueWhereInput
    /**
     * Limit how many AuditIssues to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditIssue upsert
   */
  export type AuditIssueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditIssue to update in case it exists.
     */
    where: AuditIssueWhereUniqueInput
    /**
     * In case the AuditIssue found by the `where` argument doesn't exist, create a new AuditIssue with this data.
     */
    create: XOR<AuditIssueCreateInput, AuditIssueUncheckedCreateInput>
    /**
     * In case the AuditIssue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditIssueUpdateInput, AuditIssueUncheckedUpdateInput>
  }

  /**
   * AuditIssue delete
   */
  export type AuditIssueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
    /**
     * Filter which AuditIssue to delete.
     */
    where: AuditIssueWhereUniqueInput
  }

  /**
   * AuditIssue deleteMany
   */
  export type AuditIssueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditIssues to delete
     */
    where?: AuditIssueWhereInput
    /**
     * Limit how many AuditIssues to delete.
     */
    limit?: number
  }

  /**
   * AuditIssue without action
   */
  export type AuditIssueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditIssue
     */
    select?: AuditIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditIssue
     */
    omit?: AuditIssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIssueInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    role: 'role',
    agencyName: 'agencyName',
    apiKey: 'apiKey',
    avatar: 'avatar',
    auditSchedule: 'auditSchedule',
    staleProtection: 'staleProtection',
    autoPurgeCache: 'autoPurgeCache',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConnectedWebsiteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    siteUrl: 'siteUrl',
    apiKey: 'apiKey',
    hmacSecret: 'hmacSecret',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConnectedWebsiteScalarFieldEnum = (typeof ConnectedWebsiteScalarFieldEnum)[keyof typeof ConnectedWebsiteScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const WordPressSiteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    url: 'url',
    adminEmail: 'adminEmail',
    connectionState: 'connectionState',
    health: 'health',
    seoProvider: 'seoProvider',
    acfVersion: 'acfVersion',
    themeName: 'themeName',
    lastAuditedAt: 'lastAuditedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WordPressSiteScalarFieldEnum = (typeof WordPressSiteScalarFieldEnum)[keyof typeof WordPressSiteScalarFieldEnum]


  export const ActionProposalScalarFieldEnum: {
    id: 'id',
    siteId: 'siteId',
    userId: 'userId',
    targetPageId: 'targetPageId',
    targetPageTitle: 'targetPageTitle',
    targetPageSlug: 'targetPageSlug',
    actionType: 'actionType',
    currentValues: 'currentValues',
    proposedValues: 'proposedValues',
    approvedChecksum: 'approvedChecksum',
    currentChecksum: 'currentChecksum',
    isStale: 'isStale',
    seoProvider: 'seoProvider',
    adapterSupportLevel: 'adapterSupportLevel',
    rollbackConfidence: 'rollbackConfidence',
    possibleSideEffects: 'possibleSideEffects',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ActionProposalScalarFieldEnum = (typeof ActionProposalScalarFieldEnum)[keyof typeof ActionProposalScalarFieldEnum]


  export const ActionLogItemScalarFieldEnum: {
    id: 'id',
    siteId: 'siteId',
    userId: 'userId',
    actionTitle: 'actionTitle',
    targetEntity: 'targetEntity',
    executedBy: 'executedBy',
    timestamp: 'timestamp',
    executionState: 'executionState',
    verificationStatus: 'verificationStatus',
    rollbackStatus: 'rollbackStatus',
    rollbackConfidence: 'rollbackConfidence',
    checksum: 'checksum',
    snapshotData: 'snapshotData',
    sideEffects: 'sideEffects',
    createdAt: 'createdAt'
  };

  export type ActionLogItemScalarFieldEnum = (typeof ActionLogItemScalarFieldEnum)[keyof typeof ActionLogItemScalarFieldEnum]


  export const SiteAuditSummaryScalarFieldEnum: {
    id: 'id',
    siteId: 'siteId',
    overallScore: 'overallScore',
    seoScore: 'seoScore',
    contentScore: 'contentScore',
    technicalScore: 'technicalScore',
    auditDate: 'auditDate',
    totalIssuesCount: 'totalIssuesCount',
    criticalIssuesCount: 'criticalIssuesCount',
    warningIssuesCount: 'warningIssuesCount',
    infoIssuesCount: 'infoIssuesCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SiteAuditSummaryScalarFieldEnum = (typeof SiteAuditSummaryScalarFieldEnum)[keyof typeof SiteAuditSummaryScalarFieldEnum]


  export const AuditIssueScalarFieldEnum: {
    id: 'id',
    auditSummaryId: 'auditSummaryId',
    category: 'category',
    severity: 'severity',
    title: 'title',
    description: 'description',
    affectedUrl: 'affectedUrl',
    pageTitle: 'pageTitle',
    recommendation: 'recommendation',
    autoFixable: 'autoFixable',
    actionPayload: 'actionPayload',
    createdAt: 'createdAt'
  };

  export type AuditIssueScalarFieldEnum = (typeof AuditIssueScalarFieldEnum)[keyof typeof AuditIssueScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    agencyName?: StringNullableFilter<"User"> | string | null
    apiKey?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    auditSchedule?: StringFilter<"User"> | string
    staleProtection?: BoolFilter<"User"> | boolean
    autoPurgeCache?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    sites?: WordPressSiteListRelationFilter
    connectedWebsites?: ConnectedWebsiteListRelationFilter
    proposals?: ActionProposalListRelationFilter
    actionLogs?: ActionLogItemListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    agencyName?: SortOrderInput | SortOrder
    apiKey?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    auditSchedule?: SortOrder
    staleProtection?: SortOrder
    autoPurgeCache?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    sites?: WordPressSiteOrderByRelationAggregateInput
    connectedWebsites?: ConnectedWebsiteOrderByRelationAggregateInput
    proposals?: ActionProposalOrderByRelationAggregateInput
    actionLogs?: ActionLogItemOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    apiKey?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    agencyName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    auditSchedule?: StringFilter<"User"> | string
    staleProtection?: BoolFilter<"User"> | boolean
    autoPurgeCache?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    sites?: WordPressSiteListRelationFilter
    connectedWebsites?: ConnectedWebsiteListRelationFilter
    proposals?: ActionProposalListRelationFilter
    actionLogs?: ActionLogItemListRelationFilter
  }, "id" | "email" | "apiKey">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    agencyName?: SortOrderInput | SortOrder
    apiKey?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    auditSchedule?: SortOrder
    staleProtection?: SortOrder
    autoPurgeCache?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    agencyName?: StringNullableWithAggregatesFilter<"User"> | string | null
    apiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    auditSchedule?: StringWithAggregatesFilter<"User"> | string
    staleProtection?: BoolWithAggregatesFilter<"User"> | boolean
    autoPurgeCache?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ConnectedWebsiteWhereInput = {
    AND?: ConnectedWebsiteWhereInput | ConnectedWebsiteWhereInput[]
    OR?: ConnectedWebsiteWhereInput[]
    NOT?: ConnectedWebsiteWhereInput | ConnectedWebsiteWhereInput[]
    id?: StringFilter<"ConnectedWebsite"> | string
    userId?: StringFilter<"ConnectedWebsite"> | string
    siteUrl?: StringFilter<"ConnectedWebsite"> | string
    apiKey?: StringFilter<"ConnectedWebsite"> | string
    hmacSecret?: StringFilter<"ConnectedWebsite"> | string
    status?: StringFilter<"ConnectedWebsite"> | string
    createdAt?: DateTimeFilter<"ConnectedWebsite"> | Date | string
    updatedAt?: DateTimeFilter<"ConnectedWebsite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ConnectedWebsiteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    siteUrl?: SortOrder
    apiKey?: SortOrder
    hmacSecret?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ConnectedWebsiteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConnectedWebsiteWhereInput | ConnectedWebsiteWhereInput[]
    OR?: ConnectedWebsiteWhereInput[]
    NOT?: ConnectedWebsiteWhereInput | ConnectedWebsiteWhereInput[]
    userId?: StringFilter<"ConnectedWebsite"> | string
    siteUrl?: StringFilter<"ConnectedWebsite"> | string
    apiKey?: StringFilter<"ConnectedWebsite"> | string
    hmacSecret?: StringFilter<"ConnectedWebsite"> | string
    status?: StringFilter<"ConnectedWebsite"> | string
    createdAt?: DateTimeFilter<"ConnectedWebsite"> | Date | string
    updatedAt?: DateTimeFilter<"ConnectedWebsite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ConnectedWebsiteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    siteUrl?: SortOrder
    apiKey?: SortOrder
    hmacSecret?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConnectedWebsiteCountOrderByAggregateInput
    _max?: ConnectedWebsiteMaxOrderByAggregateInput
    _min?: ConnectedWebsiteMinOrderByAggregateInput
  }

  export type ConnectedWebsiteScalarWhereWithAggregatesInput = {
    AND?: ConnectedWebsiteScalarWhereWithAggregatesInput | ConnectedWebsiteScalarWhereWithAggregatesInput[]
    OR?: ConnectedWebsiteScalarWhereWithAggregatesInput[]
    NOT?: ConnectedWebsiteScalarWhereWithAggregatesInput | ConnectedWebsiteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConnectedWebsite"> | string
    userId?: StringWithAggregatesFilter<"ConnectedWebsite"> | string
    siteUrl?: StringWithAggregatesFilter<"ConnectedWebsite"> | string
    apiKey?: StringWithAggregatesFilter<"ConnectedWebsite"> | string
    hmacSecret?: StringWithAggregatesFilter<"ConnectedWebsite"> | string
    status?: StringWithAggregatesFilter<"ConnectedWebsite"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ConnectedWebsite"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ConnectedWebsite"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    email?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    email?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }, "id" | "token">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    email?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type WordPressSiteWhereInput = {
    AND?: WordPressSiteWhereInput | WordPressSiteWhereInput[]
    OR?: WordPressSiteWhereInput[]
    NOT?: WordPressSiteWhereInput | WordPressSiteWhereInput[]
    id?: StringFilter<"WordPressSite"> | string
    userId?: StringFilter<"WordPressSite"> | string
    name?: StringFilter<"WordPressSite"> | string
    url?: StringFilter<"WordPressSite"> | string
    adminEmail?: StringFilter<"WordPressSite"> | string
    connectionState?: StringFilter<"WordPressSite"> | string
    health?: JsonFilter<"WordPressSite">
    seoProvider?: JsonFilter<"WordPressSite">
    acfVersion?: StringNullableFilter<"WordPressSite"> | string | null
    themeName?: StringFilter<"WordPressSite"> | string
    lastAuditedAt?: DateTimeNullableFilter<"WordPressSite"> | Date | string | null
    createdAt?: DateTimeFilter<"WordPressSite"> | Date | string
    updatedAt?: DateTimeFilter<"WordPressSite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    proposals?: ActionProposalListRelationFilter
    actionLogs?: ActionLogItemListRelationFilter
    audits?: SiteAuditSummaryListRelationFilter
  }

  export type WordPressSiteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    adminEmail?: SortOrder
    connectionState?: SortOrder
    health?: SortOrder
    seoProvider?: SortOrder
    acfVersion?: SortOrderInput | SortOrder
    themeName?: SortOrder
    lastAuditedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    proposals?: ActionProposalOrderByRelationAggregateInput
    actionLogs?: ActionLogItemOrderByRelationAggregateInput
    audits?: SiteAuditSummaryOrderByRelationAggregateInput
  }

  export type WordPressSiteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WordPressSiteWhereInput | WordPressSiteWhereInput[]
    OR?: WordPressSiteWhereInput[]
    NOT?: WordPressSiteWhereInput | WordPressSiteWhereInput[]
    userId?: StringFilter<"WordPressSite"> | string
    name?: StringFilter<"WordPressSite"> | string
    url?: StringFilter<"WordPressSite"> | string
    adminEmail?: StringFilter<"WordPressSite"> | string
    connectionState?: StringFilter<"WordPressSite"> | string
    health?: JsonFilter<"WordPressSite">
    seoProvider?: JsonFilter<"WordPressSite">
    acfVersion?: StringNullableFilter<"WordPressSite"> | string | null
    themeName?: StringFilter<"WordPressSite"> | string
    lastAuditedAt?: DateTimeNullableFilter<"WordPressSite"> | Date | string | null
    createdAt?: DateTimeFilter<"WordPressSite"> | Date | string
    updatedAt?: DateTimeFilter<"WordPressSite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    proposals?: ActionProposalListRelationFilter
    actionLogs?: ActionLogItemListRelationFilter
    audits?: SiteAuditSummaryListRelationFilter
  }, "id">

  export type WordPressSiteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    adminEmail?: SortOrder
    connectionState?: SortOrder
    health?: SortOrder
    seoProvider?: SortOrder
    acfVersion?: SortOrderInput | SortOrder
    themeName?: SortOrder
    lastAuditedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WordPressSiteCountOrderByAggregateInput
    _max?: WordPressSiteMaxOrderByAggregateInput
    _min?: WordPressSiteMinOrderByAggregateInput
  }

  export type WordPressSiteScalarWhereWithAggregatesInput = {
    AND?: WordPressSiteScalarWhereWithAggregatesInput | WordPressSiteScalarWhereWithAggregatesInput[]
    OR?: WordPressSiteScalarWhereWithAggregatesInput[]
    NOT?: WordPressSiteScalarWhereWithAggregatesInput | WordPressSiteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WordPressSite"> | string
    userId?: StringWithAggregatesFilter<"WordPressSite"> | string
    name?: StringWithAggregatesFilter<"WordPressSite"> | string
    url?: StringWithAggregatesFilter<"WordPressSite"> | string
    adminEmail?: StringWithAggregatesFilter<"WordPressSite"> | string
    connectionState?: StringWithAggregatesFilter<"WordPressSite"> | string
    health?: JsonWithAggregatesFilter<"WordPressSite">
    seoProvider?: JsonWithAggregatesFilter<"WordPressSite">
    acfVersion?: StringNullableWithAggregatesFilter<"WordPressSite"> | string | null
    themeName?: StringWithAggregatesFilter<"WordPressSite"> | string
    lastAuditedAt?: DateTimeNullableWithAggregatesFilter<"WordPressSite"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WordPressSite"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WordPressSite"> | Date | string
  }

  export type ActionProposalWhereInput = {
    AND?: ActionProposalWhereInput | ActionProposalWhereInput[]
    OR?: ActionProposalWhereInput[]
    NOT?: ActionProposalWhereInput | ActionProposalWhereInput[]
    id?: StringFilter<"ActionProposal"> | string
    siteId?: StringFilter<"ActionProposal"> | string
    userId?: StringNullableFilter<"ActionProposal"> | string | null
    targetPageId?: IntFilter<"ActionProposal"> | number
    targetPageTitle?: StringFilter<"ActionProposal"> | string
    targetPageSlug?: StringFilter<"ActionProposal"> | string
    actionType?: StringFilter<"ActionProposal"> | string
    currentValues?: JsonFilter<"ActionProposal">
    proposedValues?: JsonFilter<"ActionProposal">
    approvedChecksum?: StringFilter<"ActionProposal"> | string
    currentChecksum?: StringFilter<"ActionProposal"> | string
    isStale?: BoolFilter<"ActionProposal"> | boolean
    seoProvider?: StringFilter<"ActionProposal"> | string
    adapterSupportLevel?: StringFilter<"ActionProposal"> | string
    rollbackConfidence?: StringFilter<"ActionProposal"> | string
    possibleSideEffects?: JsonFilter<"ActionProposal">
    status?: StringFilter<"ActionProposal"> | string
    createdAt?: DateTimeFilter<"ActionProposal"> | Date | string
    updatedAt?: DateTimeFilter<"ActionProposal"> | Date | string
    site?: XOR<WordPressSiteScalarRelationFilter, WordPressSiteWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ActionProposalOrderByWithRelationInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrderInput | SortOrder
    targetPageId?: SortOrder
    targetPageTitle?: SortOrder
    targetPageSlug?: SortOrder
    actionType?: SortOrder
    currentValues?: SortOrder
    proposedValues?: SortOrder
    approvedChecksum?: SortOrder
    currentChecksum?: SortOrder
    isStale?: SortOrder
    seoProvider?: SortOrder
    adapterSupportLevel?: SortOrder
    rollbackConfidence?: SortOrder
    possibleSideEffects?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    site?: WordPressSiteOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ActionProposalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActionProposalWhereInput | ActionProposalWhereInput[]
    OR?: ActionProposalWhereInput[]
    NOT?: ActionProposalWhereInput | ActionProposalWhereInput[]
    siteId?: StringFilter<"ActionProposal"> | string
    userId?: StringNullableFilter<"ActionProposal"> | string | null
    targetPageId?: IntFilter<"ActionProposal"> | number
    targetPageTitle?: StringFilter<"ActionProposal"> | string
    targetPageSlug?: StringFilter<"ActionProposal"> | string
    actionType?: StringFilter<"ActionProposal"> | string
    currentValues?: JsonFilter<"ActionProposal">
    proposedValues?: JsonFilter<"ActionProposal">
    approvedChecksum?: StringFilter<"ActionProposal"> | string
    currentChecksum?: StringFilter<"ActionProposal"> | string
    isStale?: BoolFilter<"ActionProposal"> | boolean
    seoProvider?: StringFilter<"ActionProposal"> | string
    adapterSupportLevel?: StringFilter<"ActionProposal"> | string
    rollbackConfidence?: StringFilter<"ActionProposal"> | string
    possibleSideEffects?: JsonFilter<"ActionProposal">
    status?: StringFilter<"ActionProposal"> | string
    createdAt?: DateTimeFilter<"ActionProposal"> | Date | string
    updatedAt?: DateTimeFilter<"ActionProposal"> | Date | string
    site?: XOR<WordPressSiteScalarRelationFilter, WordPressSiteWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ActionProposalOrderByWithAggregationInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrderInput | SortOrder
    targetPageId?: SortOrder
    targetPageTitle?: SortOrder
    targetPageSlug?: SortOrder
    actionType?: SortOrder
    currentValues?: SortOrder
    proposedValues?: SortOrder
    approvedChecksum?: SortOrder
    currentChecksum?: SortOrder
    isStale?: SortOrder
    seoProvider?: SortOrder
    adapterSupportLevel?: SortOrder
    rollbackConfidence?: SortOrder
    possibleSideEffects?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActionProposalCountOrderByAggregateInput
    _avg?: ActionProposalAvgOrderByAggregateInput
    _max?: ActionProposalMaxOrderByAggregateInput
    _min?: ActionProposalMinOrderByAggregateInput
    _sum?: ActionProposalSumOrderByAggregateInput
  }

  export type ActionProposalScalarWhereWithAggregatesInput = {
    AND?: ActionProposalScalarWhereWithAggregatesInput | ActionProposalScalarWhereWithAggregatesInput[]
    OR?: ActionProposalScalarWhereWithAggregatesInput[]
    NOT?: ActionProposalScalarWhereWithAggregatesInput | ActionProposalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActionProposal"> | string
    siteId?: StringWithAggregatesFilter<"ActionProposal"> | string
    userId?: StringNullableWithAggregatesFilter<"ActionProposal"> | string | null
    targetPageId?: IntWithAggregatesFilter<"ActionProposal"> | number
    targetPageTitle?: StringWithAggregatesFilter<"ActionProposal"> | string
    targetPageSlug?: StringWithAggregatesFilter<"ActionProposal"> | string
    actionType?: StringWithAggregatesFilter<"ActionProposal"> | string
    currentValues?: JsonWithAggregatesFilter<"ActionProposal">
    proposedValues?: JsonWithAggregatesFilter<"ActionProposal">
    approvedChecksum?: StringWithAggregatesFilter<"ActionProposal"> | string
    currentChecksum?: StringWithAggregatesFilter<"ActionProposal"> | string
    isStale?: BoolWithAggregatesFilter<"ActionProposal"> | boolean
    seoProvider?: StringWithAggregatesFilter<"ActionProposal"> | string
    adapterSupportLevel?: StringWithAggregatesFilter<"ActionProposal"> | string
    rollbackConfidence?: StringWithAggregatesFilter<"ActionProposal"> | string
    possibleSideEffects?: JsonWithAggregatesFilter<"ActionProposal">
    status?: StringWithAggregatesFilter<"ActionProposal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ActionProposal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ActionProposal"> | Date | string
  }

  export type ActionLogItemWhereInput = {
    AND?: ActionLogItemWhereInput | ActionLogItemWhereInput[]
    OR?: ActionLogItemWhereInput[]
    NOT?: ActionLogItemWhereInput | ActionLogItemWhereInput[]
    id?: StringFilter<"ActionLogItem"> | string
    siteId?: StringFilter<"ActionLogItem"> | string
    userId?: StringNullableFilter<"ActionLogItem"> | string | null
    actionTitle?: StringFilter<"ActionLogItem"> | string
    targetEntity?: StringFilter<"ActionLogItem"> | string
    executedBy?: StringFilter<"ActionLogItem"> | string
    timestamp?: DateTimeFilter<"ActionLogItem"> | Date | string
    executionState?: StringFilter<"ActionLogItem"> | string
    verificationStatus?: StringFilter<"ActionLogItem"> | string
    rollbackStatus?: StringFilter<"ActionLogItem"> | string
    rollbackConfidence?: StringFilter<"ActionLogItem"> | string
    checksum?: StringFilter<"ActionLogItem"> | string
    snapshotData?: JsonFilter<"ActionLogItem">
    sideEffects?: JsonFilter<"ActionLogItem">
    createdAt?: DateTimeFilter<"ActionLogItem"> | Date | string
    site?: XOR<WordPressSiteScalarRelationFilter, WordPressSiteWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ActionLogItemOrderByWithRelationInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrderInput | SortOrder
    actionTitle?: SortOrder
    targetEntity?: SortOrder
    executedBy?: SortOrder
    timestamp?: SortOrder
    executionState?: SortOrder
    verificationStatus?: SortOrder
    rollbackStatus?: SortOrder
    rollbackConfidence?: SortOrder
    checksum?: SortOrder
    snapshotData?: SortOrder
    sideEffects?: SortOrder
    createdAt?: SortOrder
    site?: WordPressSiteOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ActionLogItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActionLogItemWhereInput | ActionLogItemWhereInput[]
    OR?: ActionLogItemWhereInput[]
    NOT?: ActionLogItemWhereInput | ActionLogItemWhereInput[]
    siteId?: StringFilter<"ActionLogItem"> | string
    userId?: StringNullableFilter<"ActionLogItem"> | string | null
    actionTitle?: StringFilter<"ActionLogItem"> | string
    targetEntity?: StringFilter<"ActionLogItem"> | string
    executedBy?: StringFilter<"ActionLogItem"> | string
    timestamp?: DateTimeFilter<"ActionLogItem"> | Date | string
    executionState?: StringFilter<"ActionLogItem"> | string
    verificationStatus?: StringFilter<"ActionLogItem"> | string
    rollbackStatus?: StringFilter<"ActionLogItem"> | string
    rollbackConfidence?: StringFilter<"ActionLogItem"> | string
    checksum?: StringFilter<"ActionLogItem"> | string
    snapshotData?: JsonFilter<"ActionLogItem">
    sideEffects?: JsonFilter<"ActionLogItem">
    createdAt?: DateTimeFilter<"ActionLogItem"> | Date | string
    site?: XOR<WordPressSiteScalarRelationFilter, WordPressSiteWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ActionLogItemOrderByWithAggregationInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrderInput | SortOrder
    actionTitle?: SortOrder
    targetEntity?: SortOrder
    executedBy?: SortOrder
    timestamp?: SortOrder
    executionState?: SortOrder
    verificationStatus?: SortOrder
    rollbackStatus?: SortOrder
    rollbackConfidence?: SortOrder
    checksum?: SortOrder
    snapshotData?: SortOrder
    sideEffects?: SortOrder
    createdAt?: SortOrder
    _count?: ActionLogItemCountOrderByAggregateInput
    _max?: ActionLogItemMaxOrderByAggregateInput
    _min?: ActionLogItemMinOrderByAggregateInput
  }

  export type ActionLogItemScalarWhereWithAggregatesInput = {
    AND?: ActionLogItemScalarWhereWithAggregatesInput | ActionLogItemScalarWhereWithAggregatesInput[]
    OR?: ActionLogItemScalarWhereWithAggregatesInput[]
    NOT?: ActionLogItemScalarWhereWithAggregatesInput | ActionLogItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActionLogItem"> | string
    siteId?: StringWithAggregatesFilter<"ActionLogItem"> | string
    userId?: StringNullableWithAggregatesFilter<"ActionLogItem"> | string | null
    actionTitle?: StringWithAggregatesFilter<"ActionLogItem"> | string
    targetEntity?: StringWithAggregatesFilter<"ActionLogItem"> | string
    executedBy?: StringWithAggregatesFilter<"ActionLogItem"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ActionLogItem"> | Date | string
    executionState?: StringWithAggregatesFilter<"ActionLogItem"> | string
    verificationStatus?: StringWithAggregatesFilter<"ActionLogItem"> | string
    rollbackStatus?: StringWithAggregatesFilter<"ActionLogItem"> | string
    rollbackConfidence?: StringWithAggregatesFilter<"ActionLogItem"> | string
    checksum?: StringWithAggregatesFilter<"ActionLogItem"> | string
    snapshotData?: JsonWithAggregatesFilter<"ActionLogItem">
    sideEffects?: JsonWithAggregatesFilter<"ActionLogItem">
    createdAt?: DateTimeWithAggregatesFilter<"ActionLogItem"> | Date | string
  }

  export type SiteAuditSummaryWhereInput = {
    AND?: SiteAuditSummaryWhereInput | SiteAuditSummaryWhereInput[]
    OR?: SiteAuditSummaryWhereInput[]
    NOT?: SiteAuditSummaryWhereInput | SiteAuditSummaryWhereInput[]
    id?: StringFilter<"SiteAuditSummary"> | string
    siteId?: StringFilter<"SiteAuditSummary"> | string
    overallScore?: IntFilter<"SiteAuditSummary"> | number
    seoScore?: IntFilter<"SiteAuditSummary"> | number
    contentScore?: IntFilter<"SiteAuditSummary"> | number
    technicalScore?: IntFilter<"SiteAuditSummary"> | number
    auditDate?: DateTimeFilter<"SiteAuditSummary"> | Date | string
    totalIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    criticalIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    warningIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    infoIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    createdAt?: DateTimeFilter<"SiteAuditSummary"> | Date | string
    updatedAt?: DateTimeFilter<"SiteAuditSummary"> | Date | string
    site?: XOR<WordPressSiteScalarRelationFilter, WordPressSiteWhereInput>
    issues?: AuditIssueListRelationFilter
  }

  export type SiteAuditSummaryOrderByWithRelationInput = {
    id?: SortOrder
    siteId?: SortOrder
    overallScore?: SortOrder
    seoScore?: SortOrder
    contentScore?: SortOrder
    technicalScore?: SortOrder
    auditDate?: SortOrder
    totalIssuesCount?: SortOrder
    criticalIssuesCount?: SortOrder
    warningIssuesCount?: SortOrder
    infoIssuesCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    site?: WordPressSiteOrderByWithRelationInput
    issues?: AuditIssueOrderByRelationAggregateInput
  }

  export type SiteAuditSummaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SiteAuditSummaryWhereInput | SiteAuditSummaryWhereInput[]
    OR?: SiteAuditSummaryWhereInput[]
    NOT?: SiteAuditSummaryWhereInput | SiteAuditSummaryWhereInput[]
    siteId?: StringFilter<"SiteAuditSummary"> | string
    overallScore?: IntFilter<"SiteAuditSummary"> | number
    seoScore?: IntFilter<"SiteAuditSummary"> | number
    contentScore?: IntFilter<"SiteAuditSummary"> | number
    technicalScore?: IntFilter<"SiteAuditSummary"> | number
    auditDate?: DateTimeFilter<"SiteAuditSummary"> | Date | string
    totalIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    criticalIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    warningIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    infoIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    createdAt?: DateTimeFilter<"SiteAuditSummary"> | Date | string
    updatedAt?: DateTimeFilter<"SiteAuditSummary"> | Date | string
    site?: XOR<WordPressSiteScalarRelationFilter, WordPressSiteWhereInput>
    issues?: AuditIssueListRelationFilter
  }, "id">

  export type SiteAuditSummaryOrderByWithAggregationInput = {
    id?: SortOrder
    siteId?: SortOrder
    overallScore?: SortOrder
    seoScore?: SortOrder
    contentScore?: SortOrder
    technicalScore?: SortOrder
    auditDate?: SortOrder
    totalIssuesCount?: SortOrder
    criticalIssuesCount?: SortOrder
    warningIssuesCount?: SortOrder
    infoIssuesCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SiteAuditSummaryCountOrderByAggregateInput
    _avg?: SiteAuditSummaryAvgOrderByAggregateInput
    _max?: SiteAuditSummaryMaxOrderByAggregateInput
    _min?: SiteAuditSummaryMinOrderByAggregateInput
    _sum?: SiteAuditSummarySumOrderByAggregateInput
  }

  export type SiteAuditSummaryScalarWhereWithAggregatesInput = {
    AND?: SiteAuditSummaryScalarWhereWithAggregatesInput | SiteAuditSummaryScalarWhereWithAggregatesInput[]
    OR?: SiteAuditSummaryScalarWhereWithAggregatesInput[]
    NOT?: SiteAuditSummaryScalarWhereWithAggregatesInput | SiteAuditSummaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SiteAuditSummary"> | string
    siteId?: StringWithAggregatesFilter<"SiteAuditSummary"> | string
    overallScore?: IntWithAggregatesFilter<"SiteAuditSummary"> | number
    seoScore?: IntWithAggregatesFilter<"SiteAuditSummary"> | number
    contentScore?: IntWithAggregatesFilter<"SiteAuditSummary"> | number
    technicalScore?: IntWithAggregatesFilter<"SiteAuditSummary"> | number
    auditDate?: DateTimeWithAggregatesFilter<"SiteAuditSummary"> | Date | string
    totalIssuesCount?: IntWithAggregatesFilter<"SiteAuditSummary"> | number
    criticalIssuesCount?: IntWithAggregatesFilter<"SiteAuditSummary"> | number
    warningIssuesCount?: IntWithAggregatesFilter<"SiteAuditSummary"> | number
    infoIssuesCount?: IntWithAggregatesFilter<"SiteAuditSummary"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SiteAuditSummary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SiteAuditSummary"> | Date | string
  }

  export type AuditIssueWhereInput = {
    AND?: AuditIssueWhereInput | AuditIssueWhereInput[]
    OR?: AuditIssueWhereInput[]
    NOT?: AuditIssueWhereInput | AuditIssueWhereInput[]
    id?: StringFilter<"AuditIssue"> | string
    auditSummaryId?: StringFilter<"AuditIssue"> | string
    category?: StringFilter<"AuditIssue"> | string
    severity?: StringFilter<"AuditIssue"> | string
    title?: StringFilter<"AuditIssue"> | string
    description?: StringFilter<"AuditIssue"> | string
    affectedUrl?: StringFilter<"AuditIssue"> | string
    pageTitle?: StringFilter<"AuditIssue"> | string
    recommendation?: StringFilter<"AuditIssue"> | string
    autoFixable?: BoolFilter<"AuditIssue"> | boolean
    actionPayload?: JsonNullableFilter<"AuditIssue">
    createdAt?: DateTimeFilter<"AuditIssue"> | Date | string
    auditSummary?: XOR<SiteAuditSummaryScalarRelationFilter, SiteAuditSummaryWhereInput>
  }

  export type AuditIssueOrderByWithRelationInput = {
    id?: SortOrder
    auditSummaryId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    description?: SortOrder
    affectedUrl?: SortOrder
    pageTitle?: SortOrder
    recommendation?: SortOrder
    autoFixable?: SortOrder
    actionPayload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    auditSummary?: SiteAuditSummaryOrderByWithRelationInput
  }

  export type AuditIssueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditIssueWhereInput | AuditIssueWhereInput[]
    OR?: AuditIssueWhereInput[]
    NOT?: AuditIssueWhereInput | AuditIssueWhereInput[]
    auditSummaryId?: StringFilter<"AuditIssue"> | string
    category?: StringFilter<"AuditIssue"> | string
    severity?: StringFilter<"AuditIssue"> | string
    title?: StringFilter<"AuditIssue"> | string
    description?: StringFilter<"AuditIssue"> | string
    affectedUrl?: StringFilter<"AuditIssue"> | string
    pageTitle?: StringFilter<"AuditIssue"> | string
    recommendation?: StringFilter<"AuditIssue"> | string
    autoFixable?: BoolFilter<"AuditIssue"> | boolean
    actionPayload?: JsonNullableFilter<"AuditIssue">
    createdAt?: DateTimeFilter<"AuditIssue"> | Date | string
    auditSummary?: XOR<SiteAuditSummaryScalarRelationFilter, SiteAuditSummaryWhereInput>
  }, "id">

  export type AuditIssueOrderByWithAggregationInput = {
    id?: SortOrder
    auditSummaryId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    description?: SortOrder
    affectedUrl?: SortOrder
    pageTitle?: SortOrder
    recommendation?: SortOrder
    autoFixable?: SortOrder
    actionPayload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditIssueCountOrderByAggregateInput
    _max?: AuditIssueMaxOrderByAggregateInput
    _min?: AuditIssueMinOrderByAggregateInput
  }

  export type AuditIssueScalarWhereWithAggregatesInput = {
    AND?: AuditIssueScalarWhereWithAggregatesInput | AuditIssueScalarWhereWithAggregatesInput[]
    OR?: AuditIssueScalarWhereWithAggregatesInput[]
    NOT?: AuditIssueScalarWhereWithAggregatesInput | AuditIssueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditIssue"> | string
    auditSummaryId?: StringWithAggregatesFilter<"AuditIssue"> | string
    category?: StringWithAggregatesFilter<"AuditIssue"> | string
    severity?: StringWithAggregatesFilter<"AuditIssue"> | string
    title?: StringWithAggregatesFilter<"AuditIssue"> | string
    description?: StringWithAggregatesFilter<"AuditIssue"> | string
    affectedUrl?: StringWithAggregatesFilter<"AuditIssue"> | string
    pageTitle?: StringWithAggregatesFilter<"AuditIssue"> | string
    recommendation?: StringWithAggregatesFilter<"AuditIssue"> | string
    autoFixable?: BoolWithAggregatesFilter<"AuditIssue"> | boolean
    actionPayload?: JsonNullableWithAggregatesFilter<"AuditIssue">
    createdAt?: DateTimeWithAggregatesFilter<"AuditIssue"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    sites?: WordPressSiteCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteCreateNestedManyWithoutUserInput
    proposals?: ActionProposalCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    sites?: WordPressSiteUncheckedCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteUncheckedCreateNestedManyWithoutUserInput
    proposals?: ActionProposalUncheckedCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    sites?: WordPressSiteUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    sites?: WordPressSiteUncheckedUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUncheckedUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUncheckedUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectedWebsiteCreateInput = {
    id?: string
    siteUrl: string
    apiKey: string
    hmacSecret: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConnectedWebsitesInput
  }

  export type ConnectedWebsiteUncheckedCreateInput = {
    id?: string
    userId: string
    siteUrl: string
    apiKey: string
    hmacSecret: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectedWebsiteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteUrl?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    hmacSecret?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConnectedWebsitesNestedInput
  }

  export type ConnectedWebsiteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    siteUrl?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    hmacSecret?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectedWebsiteCreateManyInput = {
    id?: string
    userId: string
    siteUrl: string
    apiKey: string
    hmacSecret: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectedWebsiteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteUrl?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    hmacSecret?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectedWebsiteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    siteUrl?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    hmacSecret?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordPressSiteCreateInput = {
    id?: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSitesInput
    proposals?: ActionProposalCreateNestedManyWithoutSiteInput
    actionLogs?: ActionLogItemCreateNestedManyWithoutSiteInput
    audits?: SiteAuditSummaryCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proposals?: ActionProposalUncheckedCreateNestedManyWithoutSiteInput
    actionLogs?: ActionLogItemUncheckedCreateNestedManyWithoutSiteInput
    audits?: SiteAuditSummaryUncheckedCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSitesNestedInput
    proposals?: ActionProposalUpdateManyWithoutSiteNestedInput
    actionLogs?: ActionLogItemUpdateManyWithoutSiteNestedInput
    audits?: SiteAuditSummaryUpdateManyWithoutSiteNestedInput
  }

  export type WordPressSiteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposals?: ActionProposalUncheckedUpdateManyWithoutSiteNestedInput
    actionLogs?: ActionLogItemUncheckedUpdateManyWithoutSiteNestedInput
    audits?: SiteAuditSummaryUncheckedUpdateManyWithoutSiteNestedInput
  }

  export type WordPressSiteCreateManyInput = {
    id?: string
    userId: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordPressSiteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordPressSiteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionProposalCreateInput = {
    id?: string
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonNullValueInput | InputJsonValue
    proposedValues: JsonNullValueInput | InputJsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale?: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    site: WordPressSiteCreateNestedOneWithoutProposalsInput
    user?: UserCreateNestedOneWithoutProposalsInput
  }

  export type ActionProposalUncheckedCreateInput = {
    id?: string
    siteId: string
    userId?: string | null
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonNullValueInput | InputJsonValue
    proposedValues: JsonNullValueInput | InputJsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale?: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionProposalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    site?: WordPressSiteUpdateOneRequiredWithoutProposalsNestedInput
    user?: UserUpdateOneWithoutProposalsNestedInput
  }

  export type ActionProposalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionProposalCreateManyInput = {
    id?: string
    siteId: string
    userId?: string | null
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonNullValueInput | InputJsonValue
    proposedValues: JsonNullValueInput | InputJsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale?: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionProposalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionProposalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogItemCreateInput = {
    id?: string
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp?: Date | string
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonNullValueInput | InputJsonValue
    sideEffects: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    site: WordPressSiteCreateNestedOneWithoutActionLogsInput
    user?: UserCreateNestedOneWithoutActionLogsInput
  }

  export type ActionLogItemUncheckedCreateInput = {
    id?: string
    siteId: string
    userId?: string | null
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp?: Date | string
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonNullValueInput | InputJsonValue
    sideEffects: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActionLogItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    site?: WordPressSiteUpdateOneRequiredWithoutActionLogsNestedInput
    user?: UserUpdateOneWithoutActionLogsNestedInput
  }

  export type ActionLogItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogItemCreateManyInput = {
    id?: string
    siteId: string
    userId?: string | null
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp?: Date | string
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonNullValueInput | InputJsonValue
    sideEffects: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActionLogItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteAuditSummaryCreateInput = {
    id?: string
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate?: Date | string
    totalIssuesCount?: number
    criticalIssuesCount?: number
    warningIssuesCount?: number
    infoIssuesCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    site: WordPressSiteCreateNestedOneWithoutAuditsInput
    issues?: AuditIssueCreateNestedManyWithoutAuditSummaryInput
  }

  export type SiteAuditSummaryUncheckedCreateInput = {
    id?: string
    siteId: string
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate?: Date | string
    totalIssuesCount?: number
    criticalIssuesCount?: number
    warningIssuesCount?: number
    infoIssuesCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    issues?: AuditIssueUncheckedCreateNestedManyWithoutAuditSummaryInput
  }

  export type SiteAuditSummaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallScore?: IntFieldUpdateOperationsInput | number
    seoScore?: IntFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    technicalScore?: IntFieldUpdateOperationsInput | number
    auditDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIssuesCount?: IntFieldUpdateOperationsInput | number
    criticalIssuesCount?: IntFieldUpdateOperationsInput | number
    warningIssuesCount?: IntFieldUpdateOperationsInput | number
    infoIssuesCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    site?: WordPressSiteUpdateOneRequiredWithoutAuditsNestedInput
    issues?: AuditIssueUpdateManyWithoutAuditSummaryNestedInput
  }

  export type SiteAuditSummaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    overallScore?: IntFieldUpdateOperationsInput | number
    seoScore?: IntFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    technicalScore?: IntFieldUpdateOperationsInput | number
    auditDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIssuesCount?: IntFieldUpdateOperationsInput | number
    criticalIssuesCount?: IntFieldUpdateOperationsInput | number
    warningIssuesCount?: IntFieldUpdateOperationsInput | number
    infoIssuesCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issues?: AuditIssueUncheckedUpdateManyWithoutAuditSummaryNestedInput
  }

  export type SiteAuditSummaryCreateManyInput = {
    id?: string
    siteId: string
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate?: Date | string
    totalIssuesCount?: number
    criticalIssuesCount?: number
    warningIssuesCount?: number
    infoIssuesCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteAuditSummaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallScore?: IntFieldUpdateOperationsInput | number
    seoScore?: IntFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    technicalScore?: IntFieldUpdateOperationsInput | number
    auditDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIssuesCount?: IntFieldUpdateOperationsInput | number
    criticalIssuesCount?: IntFieldUpdateOperationsInput | number
    warningIssuesCount?: IntFieldUpdateOperationsInput | number
    infoIssuesCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteAuditSummaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    overallScore?: IntFieldUpdateOperationsInput | number
    seoScore?: IntFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    technicalScore?: IntFieldUpdateOperationsInput | number
    auditDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIssuesCount?: IntFieldUpdateOperationsInput | number
    criticalIssuesCount?: IntFieldUpdateOperationsInput | number
    warningIssuesCount?: IntFieldUpdateOperationsInput | number
    infoIssuesCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditIssueCreateInput = {
    id?: string
    category: string
    severity: string
    title: string
    description: string
    affectedUrl: string
    pageTitle: string
    recommendation: string
    autoFixable?: boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    auditSummary: SiteAuditSummaryCreateNestedOneWithoutIssuesInput
  }

  export type AuditIssueUncheckedCreateInput = {
    id?: string
    auditSummaryId: string
    category: string
    severity: string
    title: string
    description: string
    affectedUrl: string
    pageTitle: string
    recommendation: string
    autoFixable?: boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditIssueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    affectedUrl?: StringFieldUpdateOperationsInput | string
    pageTitle?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    autoFixable?: BoolFieldUpdateOperationsInput | boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditSummary?: SiteAuditSummaryUpdateOneRequiredWithoutIssuesNestedInput
  }

  export type AuditIssueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    auditSummaryId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    affectedUrl?: StringFieldUpdateOperationsInput | string
    pageTitle?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    autoFixable?: BoolFieldUpdateOperationsInput | boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditIssueCreateManyInput = {
    id?: string
    auditSummaryId: string
    category: string
    severity: string
    title: string
    description: string
    affectedUrl: string
    pageTitle: string
    recommendation: string
    autoFixable?: boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditIssueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    affectedUrl?: StringFieldUpdateOperationsInput | string
    pageTitle?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    autoFixable?: BoolFieldUpdateOperationsInput | boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditIssueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    auditSummaryId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    affectedUrl?: StringFieldUpdateOperationsInput | string
    pageTitle?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    autoFixable?: BoolFieldUpdateOperationsInput | boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type WordPressSiteListRelationFilter = {
    every?: WordPressSiteWhereInput
    some?: WordPressSiteWhereInput
    none?: WordPressSiteWhereInput
  }

  export type ConnectedWebsiteListRelationFilter = {
    every?: ConnectedWebsiteWhereInput
    some?: ConnectedWebsiteWhereInput
    none?: ConnectedWebsiteWhereInput
  }

  export type ActionProposalListRelationFilter = {
    every?: ActionProposalWhereInput
    some?: ActionProposalWhereInput
    none?: ActionProposalWhereInput
  }

  export type ActionLogItemListRelationFilter = {
    every?: ActionLogItemWhereInput
    some?: ActionLogItemWhereInput
    none?: ActionLogItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WordPressSiteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConnectedWebsiteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActionProposalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActionLogItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    agencyName?: SortOrder
    apiKey?: SortOrder
    avatar?: SortOrder
    auditSchedule?: SortOrder
    staleProtection?: SortOrder
    autoPurgeCache?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    agencyName?: SortOrder
    apiKey?: SortOrder
    avatar?: SortOrder
    auditSchedule?: SortOrder
    staleProtection?: SortOrder
    autoPurgeCache?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    agencyName?: SortOrder
    apiKey?: SortOrder
    avatar?: SortOrder
    auditSchedule?: SortOrder
    staleProtection?: SortOrder
    autoPurgeCache?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ConnectedWebsiteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    siteUrl?: SortOrder
    apiKey?: SortOrder
    hmacSecret?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConnectedWebsiteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    siteUrl?: SortOrder
    apiKey?: SortOrder
    hmacSecret?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConnectedWebsiteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    siteUrl?: SortOrder
    apiKey?: SortOrder
    hmacSecret?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SiteAuditSummaryListRelationFilter = {
    every?: SiteAuditSummaryWhereInput
    some?: SiteAuditSummaryWhereInput
    none?: SiteAuditSummaryWhereInput
  }

  export type SiteAuditSummaryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WordPressSiteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    adminEmail?: SortOrder
    connectionState?: SortOrder
    health?: SortOrder
    seoProvider?: SortOrder
    acfVersion?: SortOrder
    themeName?: SortOrder
    lastAuditedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordPressSiteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    adminEmail?: SortOrder
    connectionState?: SortOrder
    acfVersion?: SortOrder
    themeName?: SortOrder
    lastAuditedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordPressSiteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    adminEmail?: SortOrder
    connectionState?: SortOrder
    acfVersion?: SortOrder
    themeName?: SortOrder
    lastAuditedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type WordPressSiteScalarRelationFilter = {
    is?: WordPressSiteWhereInput
    isNot?: WordPressSiteWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ActionProposalCountOrderByAggregateInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrder
    targetPageId?: SortOrder
    targetPageTitle?: SortOrder
    targetPageSlug?: SortOrder
    actionType?: SortOrder
    currentValues?: SortOrder
    proposedValues?: SortOrder
    approvedChecksum?: SortOrder
    currentChecksum?: SortOrder
    isStale?: SortOrder
    seoProvider?: SortOrder
    adapterSupportLevel?: SortOrder
    rollbackConfidence?: SortOrder
    possibleSideEffects?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActionProposalAvgOrderByAggregateInput = {
    targetPageId?: SortOrder
  }

  export type ActionProposalMaxOrderByAggregateInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrder
    targetPageId?: SortOrder
    targetPageTitle?: SortOrder
    targetPageSlug?: SortOrder
    actionType?: SortOrder
    approvedChecksum?: SortOrder
    currentChecksum?: SortOrder
    isStale?: SortOrder
    seoProvider?: SortOrder
    adapterSupportLevel?: SortOrder
    rollbackConfidence?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActionProposalMinOrderByAggregateInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrder
    targetPageId?: SortOrder
    targetPageTitle?: SortOrder
    targetPageSlug?: SortOrder
    actionType?: SortOrder
    approvedChecksum?: SortOrder
    currentChecksum?: SortOrder
    isStale?: SortOrder
    seoProvider?: SortOrder
    adapterSupportLevel?: SortOrder
    rollbackConfidence?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActionProposalSumOrderByAggregateInput = {
    targetPageId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ActionLogItemCountOrderByAggregateInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrder
    actionTitle?: SortOrder
    targetEntity?: SortOrder
    executedBy?: SortOrder
    timestamp?: SortOrder
    executionState?: SortOrder
    verificationStatus?: SortOrder
    rollbackStatus?: SortOrder
    rollbackConfidence?: SortOrder
    checksum?: SortOrder
    snapshotData?: SortOrder
    sideEffects?: SortOrder
    createdAt?: SortOrder
  }

  export type ActionLogItemMaxOrderByAggregateInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrder
    actionTitle?: SortOrder
    targetEntity?: SortOrder
    executedBy?: SortOrder
    timestamp?: SortOrder
    executionState?: SortOrder
    verificationStatus?: SortOrder
    rollbackStatus?: SortOrder
    rollbackConfidence?: SortOrder
    checksum?: SortOrder
    createdAt?: SortOrder
  }

  export type ActionLogItemMinOrderByAggregateInput = {
    id?: SortOrder
    siteId?: SortOrder
    userId?: SortOrder
    actionTitle?: SortOrder
    targetEntity?: SortOrder
    executedBy?: SortOrder
    timestamp?: SortOrder
    executionState?: SortOrder
    verificationStatus?: SortOrder
    rollbackStatus?: SortOrder
    rollbackConfidence?: SortOrder
    checksum?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditIssueListRelationFilter = {
    every?: AuditIssueWhereInput
    some?: AuditIssueWhereInput
    none?: AuditIssueWhereInput
  }

  export type AuditIssueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SiteAuditSummaryCountOrderByAggregateInput = {
    id?: SortOrder
    siteId?: SortOrder
    overallScore?: SortOrder
    seoScore?: SortOrder
    contentScore?: SortOrder
    technicalScore?: SortOrder
    auditDate?: SortOrder
    totalIssuesCount?: SortOrder
    criticalIssuesCount?: SortOrder
    warningIssuesCount?: SortOrder
    infoIssuesCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteAuditSummaryAvgOrderByAggregateInput = {
    overallScore?: SortOrder
    seoScore?: SortOrder
    contentScore?: SortOrder
    technicalScore?: SortOrder
    totalIssuesCount?: SortOrder
    criticalIssuesCount?: SortOrder
    warningIssuesCount?: SortOrder
    infoIssuesCount?: SortOrder
  }

  export type SiteAuditSummaryMaxOrderByAggregateInput = {
    id?: SortOrder
    siteId?: SortOrder
    overallScore?: SortOrder
    seoScore?: SortOrder
    contentScore?: SortOrder
    technicalScore?: SortOrder
    auditDate?: SortOrder
    totalIssuesCount?: SortOrder
    criticalIssuesCount?: SortOrder
    warningIssuesCount?: SortOrder
    infoIssuesCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteAuditSummaryMinOrderByAggregateInput = {
    id?: SortOrder
    siteId?: SortOrder
    overallScore?: SortOrder
    seoScore?: SortOrder
    contentScore?: SortOrder
    technicalScore?: SortOrder
    auditDate?: SortOrder
    totalIssuesCount?: SortOrder
    criticalIssuesCount?: SortOrder
    warningIssuesCount?: SortOrder
    infoIssuesCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteAuditSummarySumOrderByAggregateInput = {
    overallScore?: SortOrder
    seoScore?: SortOrder
    contentScore?: SortOrder
    technicalScore?: SortOrder
    totalIssuesCount?: SortOrder
    criticalIssuesCount?: SortOrder
    warningIssuesCount?: SortOrder
    infoIssuesCount?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SiteAuditSummaryScalarRelationFilter = {
    is?: SiteAuditSummaryWhereInput
    isNot?: SiteAuditSummaryWhereInput
  }

  export type AuditIssueCountOrderByAggregateInput = {
    id?: SortOrder
    auditSummaryId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    description?: SortOrder
    affectedUrl?: SortOrder
    pageTitle?: SortOrder
    recommendation?: SortOrder
    autoFixable?: SortOrder
    actionPayload?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditIssueMaxOrderByAggregateInput = {
    id?: SortOrder
    auditSummaryId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    description?: SortOrder
    affectedUrl?: SortOrder
    pageTitle?: SortOrder
    recommendation?: SortOrder
    autoFixable?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditIssueMinOrderByAggregateInput = {
    id?: SortOrder
    auditSummaryId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    description?: SortOrder
    affectedUrl?: SortOrder
    pageTitle?: SortOrder
    recommendation?: SortOrder
    autoFixable?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type WordPressSiteCreateNestedManyWithoutUserInput = {
    create?: XOR<WordPressSiteCreateWithoutUserInput, WordPressSiteUncheckedCreateWithoutUserInput> | WordPressSiteCreateWithoutUserInput[] | WordPressSiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutUserInput | WordPressSiteCreateOrConnectWithoutUserInput[]
    createMany?: WordPressSiteCreateManyUserInputEnvelope
    connect?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
  }

  export type ConnectedWebsiteCreateNestedManyWithoutUserInput = {
    create?: XOR<ConnectedWebsiteCreateWithoutUserInput, ConnectedWebsiteUncheckedCreateWithoutUserInput> | ConnectedWebsiteCreateWithoutUserInput[] | ConnectedWebsiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConnectedWebsiteCreateOrConnectWithoutUserInput | ConnectedWebsiteCreateOrConnectWithoutUserInput[]
    createMany?: ConnectedWebsiteCreateManyUserInputEnvelope
    connect?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
  }

  export type ActionProposalCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionProposalCreateWithoutUserInput, ActionProposalUncheckedCreateWithoutUserInput> | ActionProposalCreateWithoutUserInput[] | ActionProposalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionProposalCreateOrConnectWithoutUserInput | ActionProposalCreateOrConnectWithoutUserInput[]
    createMany?: ActionProposalCreateManyUserInputEnvelope
    connect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
  }

  export type ActionLogItemCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionLogItemCreateWithoutUserInput, ActionLogItemUncheckedCreateWithoutUserInput> | ActionLogItemCreateWithoutUserInput[] | ActionLogItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionLogItemCreateOrConnectWithoutUserInput | ActionLogItemCreateOrConnectWithoutUserInput[]
    createMany?: ActionLogItemCreateManyUserInputEnvelope
    connect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type WordPressSiteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WordPressSiteCreateWithoutUserInput, WordPressSiteUncheckedCreateWithoutUserInput> | WordPressSiteCreateWithoutUserInput[] | WordPressSiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutUserInput | WordPressSiteCreateOrConnectWithoutUserInput[]
    createMany?: WordPressSiteCreateManyUserInputEnvelope
    connect?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
  }

  export type ConnectedWebsiteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConnectedWebsiteCreateWithoutUserInput, ConnectedWebsiteUncheckedCreateWithoutUserInput> | ConnectedWebsiteCreateWithoutUserInput[] | ConnectedWebsiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConnectedWebsiteCreateOrConnectWithoutUserInput | ConnectedWebsiteCreateOrConnectWithoutUserInput[]
    createMany?: ConnectedWebsiteCreateManyUserInputEnvelope
    connect?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
  }

  export type ActionProposalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionProposalCreateWithoutUserInput, ActionProposalUncheckedCreateWithoutUserInput> | ActionProposalCreateWithoutUserInput[] | ActionProposalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionProposalCreateOrConnectWithoutUserInput | ActionProposalCreateOrConnectWithoutUserInput[]
    createMany?: ActionProposalCreateManyUserInputEnvelope
    connect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
  }

  export type ActionLogItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionLogItemCreateWithoutUserInput, ActionLogItemUncheckedCreateWithoutUserInput> | ActionLogItemCreateWithoutUserInput[] | ActionLogItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionLogItemCreateOrConnectWithoutUserInput | ActionLogItemCreateOrConnectWithoutUserInput[]
    createMany?: ActionLogItemCreateManyUserInputEnvelope
    connect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type WordPressSiteUpdateManyWithoutUserNestedInput = {
    create?: XOR<WordPressSiteCreateWithoutUserInput, WordPressSiteUncheckedCreateWithoutUserInput> | WordPressSiteCreateWithoutUserInput[] | WordPressSiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutUserInput | WordPressSiteCreateOrConnectWithoutUserInput[]
    upsert?: WordPressSiteUpsertWithWhereUniqueWithoutUserInput | WordPressSiteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WordPressSiteCreateManyUserInputEnvelope
    set?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
    disconnect?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
    delete?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
    connect?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
    update?: WordPressSiteUpdateWithWhereUniqueWithoutUserInput | WordPressSiteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WordPressSiteUpdateManyWithWhereWithoutUserInput | WordPressSiteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WordPressSiteScalarWhereInput | WordPressSiteScalarWhereInput[]
  }

  export type ConnectedWebsiteUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConnectedWebsiteCreateWithoutUserInput, ConnectedWebsiteUncheckedCreateWithoutUserInput> | ConnectedWebsiteCreateWithoutUserInput[] | ConnectedWebsiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConnectedWebsiteCreateOrConnectWithoutUserInput | ConnectedWebsiteCreateOrConnectWithoutUserInput[]
    upsert?: ConnectedWebsiteUpsertWithWhereUniqueWithoutUserInput | ConnectedWebsiteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConnectedWebsiteCreateManyUserInputEnvelope
    set?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
    disconnect?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
    delete?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
    connect?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
    update?: ConnectedWebsiteUpdateWithWhereUniqueWithoutUserInput | ConnectedWebsiteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConnectedWebsiteUpdateManyWithWhereWithoutUserInput | ConnectedWebsiteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConnectedWebsiteScalarWhereInput | ConnectedWebsiteScalarWhereInput[]
  }

  export type ActionProposalUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionProposalCreateWithoutUserInput, ActionProposalUncheckedCreateWithoutUserInput> | ActionProposalCreateWithoutUserInput[] | ActionProposalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionProposalCreateOrConnectWithoutUserInput | ActionProposalCreateOrConnectWithoutUserInput[]
    upsert?: ActionProposalUpsertWithWhereUniqueWithoutUserInput | ActionProposalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionProposalCreateManyUserInputEnvelope
    set?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    disconnect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    delete?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    connect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    update?: ActionProposalUpdateWithWhereUniqueWithoutUserInput | ActionProposalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionProposalUpdateManyWithWhereWithoutUserInput | ActionProposalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionProposalScalarWhereInput | ActionProposalScalarWhereInput[]
  }

  export type ActionLogItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionLogItemCreateWithoutUserInput, ActionLogItemUncheckedCreateWithoutUserInput> | ActionLogItemCreateWithoutUserInput[] | ActionLogItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionLogItemCreateOrConnectWithoutUserInput | ActionLogItemCreateOrConnectWithoutUserInput[]
    upsert?: ActionLogItemUpsertWithWhereUniqueWithoutUserInput | ActionLogItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionLogItemCreateManyUserInputEnvelope
    set?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    disconnect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    delete?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    connect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    update?: ActionLogItemUpdateWithWhereUniqueWithoutUserInput | ActionLogItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionLogItemUpdateManyWithWhereWithoutUserInput | ActionLogItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionLogItemScalarWhereInput | ActionLogItemScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type WordPressSiteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WordPressSiteCreateWithoutUserInput, WordPressSiteUncheckedCreateWithoutUserInput> | WordPressSiteCreateWithoutUserInput[] | WordPressSiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutUserInput | WordPressSiteCreateOrConnectWithoutUserInput[]
    upsert?: WordPressSiteUpsertWithWhereUniqueWithoutUserInput | WordPressSiteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WordPressSiteCreateManyUserInputEnvelope
    set?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
    disconnect?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
    delete?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
    connect?: WordPressSiteWhereUniqueInput | WordPressSiteWhereUniqueInput[]
    update?: WordPressSiteUpdateWithWhereUniqueWithoutUserInput | WordPressSiteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WordPressSiteUpdateManyWithWhereWithoutUserInput | WordPressSiteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WordPressSiteScalarWhereInput | WordPressSiteScalarWhereInput[]
  }

  export type ConnectedWebsiteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConnectedWebsiteCreateWithoutUserInput, ConnectedWebsiteUncheckedCreateWithoutUserInput> | ConnectedWebsiteCreateWithoutUserInput[] | ConnectedWebsiteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConnectedWebsiteCreateOrConnectWithoutUserInput | ConnectedWebsiteCreateOrConnectWithoutUserInput[]
    upsert?: ConnectedWebsiteUpsertWithWhereUniqueWithoutUserInput | ConnectedWebsiteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConnectedWebsiteCreateManyUserInputEnvelope
    set?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
    disconnect?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
    delete?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
    connect?: ConnectedWebsiteWhereUniqueInput | ConnectedWebsiteWhereUniqueInput[]
    update?: ConnectedWebsiteUpdateWithWhereUniqueWithoutUserInput | ConnectedWebsiteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConnectedWebsiteUpdateManyWithWhereWithoutUserInput | ConnectedWebsiteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConnectedWebsiteScalarWhereInput | ConnectedWebsiteScalarWhereInput[]
  }

  export type ActionProposalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionProposalCreateWithoutUserInput, ActionProposalUncheckedCreateWithoutUserInput> | ActionProposalCreateWithoutUserInput[] | ActionProposalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionProposalCreateOrConnectWithoutUserInput | ActionProposalCreateOrConnectWithoutUserInput[]
    upsert?: ActionProposalUpsertWithWhereUniqueWithoutUserInput | ActionProposalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionProposalCreateManyUserInputEnvelope
    set?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    disconnect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    delete?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    connect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    update?: ActionProposalUpdateWithWhereUniqueWithoutUserInput | ActionProposalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionProposalUpdateManyWithWhereWithoutUserInput | ActionProposalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionProposalScalarWhereInput | ActionProposalScalarWhereInput[]
  }

  export type ActionLogItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionLogItemCreateWithoutUserInput, ActionLogItemUncheckedCreateWithoutUserInput> | ActionLogItemCreateWithoutUserInput[] | ActionLogItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionLogItemCreateOrConnectWithoutUserInput | ActionLogItemCreateOrConnectWithoutUserInput[]
    upsert?: ActionLogItemUpsertWithWhereUniqueWithoutUserInput | ActionLogItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionLogItemCreateManyUserInputEnvelope
    set?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    disconnect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    delete?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    connect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    update?: ActionLogItemUpdateWithWhereUniqueWithoutUserInput | ActionLogItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionLogItemUpdateManyWithWhereWithoutUserInput | ActionLogItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionLogItemScalarWhereInput | ActionLogItemScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutConnectedWebsitesInput = {
    create?: XOR<UserCreateWithoutConnectedWebsitesInput, UserUncheckedCreateWithoutConnectedWebsitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectedWebsitesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutConnectedWebsitesNestedInput = {
    create?: XOR<UserCreateWithoutConnectedWebsitesInput, UserUncheckedCreateWithoutConnectedWebsitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectedWebsitesInput
    upsert?: UserUpsertWithoutConnectedWebsitesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConnectedWebsitesInput, UserUpdateWithoutConnectedWebsitesInput>, UserUncheckedUpdateWithoutConnectedWebsitesInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutSitesInput = {
    create?: XOR<UserCreateWithoutSitesInput, UserUncheckedCreateWithoutSitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSitesInput
    connect?: UserWhereUniqueInput
  }

  export type ActionProposalCreateNestedManyWithoutSiteInput = {
    create?: XOR<ActionProposalCreateWithoutSiteInput, ActionProposalUncheckedCreateWithoutSiteInput> | ActionProposalCreateWithoutSiteInput[] | ActionProposalUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: ActionProposalCreateOrConnectWithoutSiteInput | ActionProposalCreateOrConnectWithoutSiteInput[]
    createMany?: ActionProposalCreateManySiteInputEnvelope
    connect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
  }

  export type ActionLogItemCreateNestedManyWithoutSiteInput = {
    create?: XOR<ActionLogItemCreateWithoutSiteInput, ActionLogItemUncheckedCreateWithoutSiteInput> | ActionLogItemCreateWithoutSiteInput[] | ActionLogItemUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: ActionLogItemCreateOrConnectWithoutSiteInput | ActionLogItemCreateOrConnectWithoutSiteInput[]
    createMany?: ActionLogItemCreateManySiteInputEnvelope
    connect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
  }

  export type SiteAuditSummaryCreateNestedManyWithoutSiteInput = {
    create?: XOR<SiteAuditSummaryCreateWithoutSiteInput, SiteAuditSummaryUncheckedCreateWithoutSiteInput> | SiteAuditSummaryCreateWithoutSiteInput[] | SiteAuditSummaryUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: SiteAuditSummaryCreateOrConnectWithoutSiteInput | SiteAuditSummaryCreateOrConnectWithoutSiteInput[]
    createMany?: SiteAuditSummaryCreateManySiteInputEnvelope
    connect?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
  }

  export type ActionProposalUncheckedCreateNestedManyWithoutSiteInput = {
    create?: XOR<ActionProposalCreateWithoutSiteInput, ActionProposalUncheckedCreateWithoutSiteInput> | ActionProposalCreateWithoutSiteInput[] | ActionProposalUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: ActionProposalCreateOrConnectWithoutSiteInput | ActionProposalCreateOrConnectWithoutSiteInput[]
    createMany?: ActionProposalCreateManySiteInputEnvelope
    connect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
  }

  export type ActionLogItemUncheckedCreateNestedManyWithoutSiteInput = {
    create?: XOR<ActionLogItemCreateWithoutSiteInput, ActionLogItemUncheckedCreateWithoutSiteInput> | ActionLogItemCreateWithoutSiteInput[] | ActionLogItemUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: ActionLogItemCreateOrConnectWithoutSiteInput | ActionLogItemCreateOrConnectWithoutSiteInput[]
    createMany?: ActionLogItemCreateManySiteInputEnvelope
    connect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
  }

  export type SiteAuditSummaryUncheckedCreateNestedManyWithoutSiteInput = {
    create?: XOR<SiteAuditSummaryCreateWithoutSiteInput, SiteAuditSummaryUncheckedCreateWithoutSiteInput> | SiteAuditSummaryCreateWithoutSiteInput[] | SiteAuditSummaryUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: SiteAuditSummaryCreateOrConnectWithoutSiteInput | SiteAuditSummaryCreateOrConnectWithoutSiteInput[]
    createMany?: SiteAuditSummaryCreateManySiteInputEnvelope
    connect?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutSitesNestedInput = {
    create?: XOR<UserCreateWithoutSitesInput, UserUncheckedCreateWithoutSitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSitesInput
    upsert?: UserUpsertWithoutSitesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSitesInput, UserUpdateWithoutSitesInput>, UserUncheckedUpdateWithoutSitesInput>
  }

  export type ActionProposalUpdateManyWithoutSiteNestedInput = {
    create?: XOR<ActionProposalCreateWithoutSiteInput, ActionProposalUncheckedCreateWithoutSiteInput> | ActionProposalCreateWithoutSiteInput[] | ActionProposalUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: ActionProposalCreateOrConnectWithoutSiteInput | ActionProposalCreateOrConnectWithoutSiteInput[]
    upsert?: ActionProposalUpsertWithWhereUniqueWithoutSiteInput | ActionProposalUpsertWithWhereUniqueWithoutSiteInput[]
    createMany?: ActionProposalCreateManySiteInputEnvelope
    set?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    disconnect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    delete?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    connect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    update?: ActionProposalUpdateWithWhereUniqueWithoutSiteInput | ActionProposalUpdateWithWhereUniqueWithoutSiteInput[]
    updateMany?: ActionProposalUpdateManyWithWhereWithoutSiteInput | ActionProposalUpdateManyWithWhereWithoutSiteInput[]
    deleteMany?: ActionProposalScalarWhereInput | ActionProposalScalarWhereInput[]
  }

  export type ActionLogItemUpdateManyWithoutSiteNestedInput = {
    create?: XOR<ActionLogItemCreateWithoutSiteInput, ActionLogItemUncheckedCreateWithoutSiteInput> | ActionLogItemCreateWithoutSiteInput[] | ActionLogItemUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: ActionLogItemCreateOrConnectWithoutSiteInput | ActionLogItemCreateOrConnectWithoutSiteInput[]
    upsert?: ActionLogItemUpsertWithWhereUniqueWithoutSiteInput | ActionLogItemUpsertWithWhereUniqueWithoutSiteInput[]
    createMany?: ActionLogItemCreateManySiteInputEnvelope
    set?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    disconnect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    delete?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    connect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    update?: ActionLogItemUpdateWithWhereUniqueWithoutSiteInput | ActionLogItemUpdateWithWhereUniqueWithoutSiteInput[]
    updateMany?: ActionLogItemUpdateManyWithWhereWithoutSiteInput | ActionLogItemUpdateManyWithWhereWithoutSiteInput[]
    deleteMany?: ActionLogItemScalarWhereInput | ActionLogItemScalarWhereInput[]
  }

  export type SiteAuditSummaryUpdateManyWithoutSiteNestedInput = {
    create?: XOR<SiteAuditSummaryCreateWithoutSiteInput, SiteAuditSummaryUncheckedCreateWithoutSiteInput> | SiteAuditSummaryCreateWithoutSiteInput[] | SiteAuditSummaryUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: SiteAuditSummaryCreateOrConnectWithoutSiteInput | SiteAuditSummaryCreateOrConnectWithoutSiteInput[]
    upsert?: SiteAuditSummaryUpsertWithWhereUniqueWithoutSiteInput | SiteAuditSummaryUpsertWithWhereUniqueWithoutSiteInput[]
    createMany?: SiteAuditSummaryCreateManySiteInputEnvelope
    set?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
    disconnect?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
    delete?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
    connect?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
    update?: SiteAuditSummaryUpdateWithWhereUniqueWithoutSiteInput | SiteAuditSummaryUpdateWithWhereUniqueWithoutSiteInput[]
    updateMany?: SiteAuditSummaryUpdateManyWithWhereWithoutSiteInput | SiteAuditSummaryUpdateManyWithWhereWithoutSiteInput[]
    deleteMany?: SiteAuditSummaryScalarWhereInput | SiteAuditSummaryScalarWhereInput[]
  }

  export type ActionProposalUncheckedUpdateManyWithoutSiteNestedInput = {
    create?: XOR<ActionProposalCreateWithoutSiteInput, ActionProposalUncheckedCreateWithoutSiteInput> | ActionProposalCreateWithoutSiteInput[] | ActionProposalUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: ActionProposalCreateOrConnectWithoutSiteInput | ActionProposalCreateOrConnectWithoutSiteInput[]
    upsert?: ActionProposalUpsertWithWhereUniqueWithoutSiteInput | ActionProposalUpsertWithWhereUniqueWithoutSiteInput[]
    createMany?: ActionProposalCreateManySiteInputEnvelope
    set?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    disconnect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    delete?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    connect?: ActionProposalWhereUniqueInput | ActionProposalWhereUniqueInput[]
    update?: ActionProposalUpdateWithWhereUniqueWithoutSiteInput | ActionProposalUpdateWithWhereUniqueWithoutSiteInput[]
    updateMany?: ActionProposalUpdateManyWithWhereWithoutSiteInput | ActionProposalUpdateManyWithWhereWithoutSiteInput[]
    deleteMany?: ActionProposalScalarWhereInput | ActionProposalScalarWhereInput[]
  }

  export type ActionLogItemUncheckedUpdateManyWithoutSiteNestedInput = {
    create?: XOR<ActionLogItemCreateWithoutSiteInput, ActionLogItemUncheckedCreateWithoutSiteInput> | ActionLogItemCreateWithoutSiteInput[] | ActionLogItemUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: ActionLogItemCreateOrConnectWithoutSiteInput | ActionLogItemCreateOrConnectWithoutSiteInput[]
    upsert?: ActionLogItemUpsertWithWhereUniqueWithoutSiteInput | ActionLogItemUpsertWithWhereUniqueWithoutSiteInput[]
    createMany?: ActionLogItemCreateManySiteInputEnvelope
    set?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    disconnect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    delete?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    connect?: ActionLogItemWhereUniqueInput | ActionLogItemWhereUniqueInput[]
    update?: ActionLogItemUpdateWithWhereUniqueWithoutSiteInput | ActionLogItemUpdateWithWhereUniqueWithoutSiteInput[]
    updateMany?: ActionLogItemUpdateManyWithWhereWithoutSiteInput | ActionLogItemUpdateManyWithWhereWithoutSiteInput[]
    deleteMany?: ActionLogItemScalarWhereInput | ActionLogItemScalarWhereInput[]
  }

  export type SiteAuditSummaryUncheckedUpdateManyWithoutSiteNestedInput = {
    create?: XOR<SiteAuditSummaryCreateWithoutSiteInput, SiteAuditSummaryUncheckedCreateWithoutSiteInput> | SiteAuditSummaryCreateWithoutSiteInput[] | SiteAuditSummaryUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: SiteAuditSummaryCreateOrConnectWithoutSiteInput | SiteAuditSummaryCreateOrConnectWithoutSiteInput[]
    upsert?: SiteAuditSummaryUpsertWithWhereUniqueWithoutSiteInput | SiteAuditSummaryUpsertWithWhereUniqueWithoutSiteInput[]
    createMany?: SiteAuditSummaryCreateManySiteInputEnvelope
    set?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
    disconnect?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
    delete?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
    connect?: SiteAuditSummaryWhereUniqueInput | SiteAuditSummaryWhereUniqueInput[]
    update?: SiteAuditSummaryUpdateWithWhereUniqueWithoutSiteInput | SiteAuditSummaryUpdateWithWhereUniqueWithoutSiteInput[]
    updateMany?: SiteAuditSummaryUpdateManyWithWhereWithoutSiteInput | SiteAuditSummaryUpdateManyWithWhereWithoutSiteInput[]
    deleteMany?: SiteAuditSummaryScalarWhereInput | SiteAuditSummaryScalarWhereInput[]
  }

  export type WordPressSiteCreateNestedOneWithoutProposalsInput = {
    create?: XOR<WordPressSiteCreateWithoutProposalsInput, WordPressSiteUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutProposalsInput
    connect?: WordPressSiteWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProposalsInput = {
    create?: XOR<UserCreateWithoutProposalsInput, UserUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProposalsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WordPressSiteUpdateOneRequiredWithoutProposalsNestedInput = {
    create?: XOR<WordPressSiteCreateWithoutProposalsInput, WordPressSiteUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutProposalsInput
    upsert?: WordPressSiteUpsertWithoutProposalsInput
    connect?: WordPressSiteWhereUniqueInput
    update?: XOR<XOR<WordPressSiteUpdateToOneWithWhereWithoutProposalsInput, WordPressSiteUpdateWithoutProposalsInput>, WordPressSiteUncheckedUpdateWithoutProposalsInput>
  }

  export type UserUpdateOneWithoutProposalsNestedInput = {
    create?: XOR<UserCreateWithoutProposalsInput, UserUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProposalsInput
    upsert?: UserUpsertWithoutProposalsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProposalsInput, UserUpdateWithoutProposalsInput>, UserUncheckedUpdateWithoutProposalsInput>
  }

  export type WordPressSiteCreateNestedOneWithoutActionLogsInput = {
    create?: XOR<WordPressSiteCreateWithoutActionLogsInput, WordPressSiteUncheckedCreateWithoutActionLogsInput>
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutActionLogsInput
    connect?: WordPressSiteWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutActionLogsInput = {
    create?: XOR<UserCreateWithoutActionLogsInput, UserUncheckedCreateWithoutActionLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionLogsInput
    connect?: UserWhereUniqueInput
  }

  export type WordPressSiteUpdateOneRequiredWithoutActionLogsNestedInput = {
    create?: XOR<WordPressSiteCreateWithoutActionLogsInput, WordPressSiteUncheckedCreateWithoutActionLogsInput>
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutActionLogsInput
    upsert?: WordPressSiteUpsertWithoutActionLogsInput
    connect?: WordPressSiteWhereUniqueInput
    update?: XOR<XOR<WordPressSiteUpdateToOneWithWhereWithoutActionLogsInput, WordPressSiteUpdateWithoutActionLogsInput>, WordPressSiteUncheckedUpdateWithoutActionLogsInput>
  }

  export type UserUpdateOneWithoutActionLogsNestedInput = {
    create?: XOR<UserCreateWithoutActionLogsInput, UserUncheckedCreateWithoutActionLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionLogsInput
    upsert?: UserUpsertWithoutActionLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActionLogsInput, UserUpdateWithoutActionLogsInput>, UserUncheckedUpdateWithoutActionLogsInput>
  }

  export type WordPressSiteCreateNestedOneWithoutAuditsInput = {
    create?: XOR<WordPressSiteCreateWithoutAuditsInput, WordPressSiteUncheckedCreateWithoutAuditsInput>
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutAuditsInput
    connect?: WordPressSiteWhereUniqueInput
  }

  export type AuditIssueCreateNestedManyWithoutAuditSummaryInput = {
    create?: XOR<AuditIssueCreateWithoutAuditSummaryInput, AuditIssueUncheckedCreateWithoutAuditSummaryInput> | AuditIssueCreateWithoutAuditSummaryInput[] | AuditIssueUncheckedCreateWithoutAuditSummaryInput[]
    connectOrCreate?: AuditIssueCreateOrConnectWithoutAuditSummaryInput | AuditIssueCreateOrConnectWithoutAuditSummaryInput[]
    createMany?: AuditIssueCreateManyAuditSummaryInputEnvelope
    connect?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
  }

  export type AuditIssueUncheckedCreateNestedManyWithoutAuditSummaryInput = {
    create?: XOR<AuditIssueCreateWithoutAuditSummaryInput, AuditIssueUncheckedCreateWithoutAuditSummaryInput> | AuditIssueCreateWithoutAuditSummaryInput[] | AuditIssueUncheckedCreateWithoutAuditSummaryInput[]
    connectOrCreate?: AuditIssueCreateOrConnectWithoutAuditSummaryInput | AuditIssueCreateOrConnectWithoutAuditSummaryInput[]
    createMany?: AuditIssueCreateManyAuditSummaryInputEnvelope
    connect?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
  }

  export type WordPressSiteUpdateOneRequiredWithoutAuditsNestedInput = {
    create?: XOR<WordPressSiteCreateWithoutAuditsInput, WordPressSiteUncheckedCreateWithoutAuditsInput>
    connectOrCreate?: WordPressSiteCreateOrConnectWithoutAuditsInput
    upsert?: WordPressSiteUpsertWithoutAuditsInput
    connect?: WordPressSiteWhereUniqueInput
    update?: XOR<XOR<WordPressSiteUpdateToOneWithWhereWithoutAuditsInput, WordPressSiteUpdateWithoutAuditsInput>, WordPressSiteUncheckedUpdateWithoutAuditsInput>
  }

  export type AuditIssueUpdateManyWithoutAuditSummaryNestedInput = {
    create?: XOR<AuditIssueCreateWithoutAuditSummaryInput, AuditIssueUncheckedCreateWithoutAuditSummaryInput> | AuditIssueCreateWithoutAuditSummaryInput[] | AuditIssueUncheckedCreateWithoutAuditSummaryInput[]
    connectOrCreate?: AuditIssueCreateOrConnectWithoutAuditSummaryInput | AuditIssueCreateOrConnectWithoutAuditSummaryInput[]
    upsert?: AuditIssueUpsertWithWhereUniqueWithoutAuditSummaryInput | AuditIssueUpsertWithWhereUniqueWithoutAuditSummaryInput[]
    createMany?: AuditIssueCreateManyAuditSummaryInputEnvelope
    set?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
    disconnect?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
    delete?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
    connect?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
    update?: AuditIssueUpdateWithWhereUniqueWithoutAuditSummaryInput | AuditIssueUpdateWithWhereUniqueWithoutAuditSummaryInput[]
    updateMany?: AuditIssueUpdateManyWithWhereWithoutAuditSummaryInput | AuditIssueUpdateManyWithWhereWithoutAuditSummaryInput[]
    deleteMany?: AuditIssueScalarWhereInput | AuditIssueScalarWhereInput[]
  }

  export type AuditIssueUncheckedUpdateManyWithoutAuditSummaryNestedInput = {
    create?: XOR<AuditIssueCreateWithoutAuditSummaryInput, AuditIssueUncheckedCreateWithoutAuditSummaryInput> | AuditIssueCreateWithoutAuditSummaryInput[] | AuditIssueUncheckedCreateWithoutAuditSummaryInput[]
    connectOrCreate?: AuditIssueCreateOrConnectWithoutAuditSummaryInput | AuditIssueCreateOrConnectWithoutAuditSummaryInput[]
    upsert?: AuditIssueUpsertWithWhereUniqueWithoutAuditSummaryInput | AuditIssueUpsertWithWhereUniqueWithoutAuditSummaryInput[]
    createMany?: AuditIssueCreateManyAuditSummaryInputEnvelope
    set?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
    disconnect?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
    delete?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
    connect?: AuditIssueWhereUniqueInput | AuditIssueWhereUniqueInput[]
    update?: AuditIssueUpdateWithWhereUniqueWithoutAuditSummaryInput | AuditIssueUpdateWithWhereUniqueWithoutAuditSummaryInput[]
    updateMany?: AuditIssueUpdateManyWithWhereWithoutAuditSummaryInput | AuditIssueUpdateManyWithWhereWithoutAuditSummaryInput[]
    deleteMany?: AuditIssueScalarWhereInput | AuditIssueScalarWhereInput[]
  }

  export type SiteAuditSummaryCreateNestedOneWithoutIssuesInput = {
    create?: XOR<SiteAuditSummaryCreateWithoutIssuesInput, SiteAuditSummaryUncheckedCreateWithoutIssuesInput>
    connectOrCreate?: SiteAuditSummaryCreateOrConnectWithoutIssuesInput
    connect?: SiteAuditSummaryWhereUniqueInput
  }

  export type SiteAuditSummaryUpdateOneRequiredWithoutIssuesNestedInput = {
    create?: XOR<SiteAuditSummaryCreateWithoutIssuesInput, SiteAuditSummaryUncheckedCreateWithoutIssuesInput>
    connectOrCreate?: SiteAuditSummaryCreateOrConnectWithoutIssuesInput
    upsert?: SiteAuditSummaryUpsertWithoutIssuesInput
    connect?: SiteAuditSummaryWhereUniqueInput
    update?: XOR<XOR<SiteAuditSummaryUpdateToOneWithWhereWithoutIssuesInput, SiteAuditSummaryUpdateWithoutIssuesInput>, SiteAuditSummaryUncheckedUpdateWithoutIssuesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WordPressSiteCreateWithoutUserInput = {
    id?: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proposals?: ActionProposalCreateNestedManyWithoutSiteInput
    actionLogs?: ActionLogItemCreateNestedManyWithoutSiteInput
    audits?: SiteAuditSummaryCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proposals?: ActionProposalUncheckedCreateNestedManyWithoutSiteInput
    actionLogs?: ActionLogItemUncheckedCreateNestedManyWithoutSiteInput
    audits?: SiteAuditSummaryUncheckedCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteCreateOrConnectWithoutUserInput = {
    where: WordPressSiteWhereUniqueInput
    create: XOR<WordPressSiteCreateWithoutUserInput, WordPressSiteUncheckedCreateWithoutUserInput>
  }

  export type WordPressSiteCreateManyUserInputEnvelope = {
    data: WordPressSiteCreateManyUserInput | WordPressSiteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConnectedWebsiteCreateWithoutUserInput = {
    id?: string
    siteUrl: string
    apiKey: string
    hmacSecret: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectedWebsiteUncheckedCreateWithoutUserInput = {
    id?: string
    siteUrl: string
    apiKey: string
    hmacSecret: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectedWebsiteCreateOrConnectWithoutUserInput = {
    where: ConnectedWebsiteWhereUniqueInput
    create: XOR<ConnectedWebsiteCreateWithoutUserInput, ConnectedWebsiteUncheckedCreateWithoutUserInput>
  }

  export type ConnectedWebsiteCreateManyUserInputEnvelope = {
    data: ConnectedWebsiteCreateManyUserInput | ConnectedWebsiteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActionProposalCreateWithoutUserInput = {
    id?: string
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonNullValueInput | InputJsonValue
    proposedValues: JsonNullValueInput | InputJsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale?: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    site: WordPressSiteCreateNestedOneWithoutProposalsInput
  }

  export type ActionProposalUncheckedCreateWithoutUserInput = {
    id?: string
    siteId: string
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonNullValueInput | InputJsonValue
    proposedValues: JsonNullValueInput | InputJsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale?: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionProposalCreateOrConnectWithoutUserInput = {
    where: ActionProposalWhereUniqueInput
    create: XOR<ActionProposalCreateWithoutUserInput, ActionProposalUncheckedCreateWithoutUserInput>
  }

  export type ActionProposalCreateManyUserInputEnvelope = {
    data: ActionProposalCreateManyUserInput | ActionProposalCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActionLogItemCreateWithoutUserInput = {
    id?: string
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp?: Date | string
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonNullValueInput | InputJsonValue
    sideEffects: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    site: WordPressSiteCreateNestedOneWithoutActionLogsInput
  }

  export type ActionLogItemUncheckedCreateWithoutUserInput = {
    id?: string
    siteId: string
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp?: Date | string
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonNullValueInput | InputJsonValue
    sideEffects: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActionLogItemCreateOrConnectWithoutUserInput = {
    where: ActionLogItemWhereUniqueInput
    create: XOR<ActionLogItemCreateWithoutUserInput, ActionLogItemUncheckedCreateWithoutUserInput>
  }

  export type ActionLogItemCreateManyUserInputEnvelope = {
    data: ActionLogItemCreateManyUserInput | ActionLogItemCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type WordPressSiteUpsertWithWhereUniqueWithoutUserInput = {
    where: WordPressSiteWhereUniqueInput
    update: XOR<WordPressSiteUpdateWithoutUserInput, WordPressSiteUncheckedUpdateWithoutUserInput>
    create: XOR<WordPressSiteCreateWithoutUserInput, WordPressSiteUncheckedCreateWithoutUserInput>
  }

  export type WordPressSiteUpdateWithWhereUniqueWithoutUserInput = {
    where: WordPressSiteWhereUniqueInput
    data: XOR<WordPressSiteUpdateWithoutUserInput, WordPressSiteUncheckedUpdateWithoutUserInput>
  }

  export type WordPressSiteUpdateManyWithWhereWithoutUserInput = {
    where: WordPressSiteScalarWhereInput
    data: XOR<WordPressSiteUpdateManyMutationInput, WordPressSiteUncheckedUpdateManyWithoutUserInput>
  }

  export type WordPressSiteScalarWhereInput = {
    AND?: WordPressSiteScalarWhereInput | WordPressSiteScalarWhereInput[]
    OR?: WordPressSiteScalarWhereInput[]
    NOT?: WordPressSiteScalarWhereInput | WordPressSiteScalarWhereInput[]
    id?: StringFilter<"WordPressSite"> | string
    userId?: StringFilter<"WordPressSite"> | string
    name?: StringFilter<"WordPressSite"> | string
    url?: StringFilter<"WordPressSite"> | string
    adminEmail?: StringFilter<"WordPressSite"> | string
    connectionState?: StringFilter<"WordPressSite"> | string
    health?: JsonFilter<"WordPressSite">
    seoProvider?: JsonFilter<"WordPressSite">
    acfVersion?: StringNullableFilter<"WordPressSite"> | string | null
    themeName?: StringFilter<"WordPressSite"> | string
    lastAuditedAt?: DateTimeNullableFilter<"WordPressSite"> | Date | string | null
    createdAt?: DateTimeFilter<"WordPressSite"> | Date | string
    updatedAt?: DateTimeFilter<"WordPressSite"> | Date | string
  }

  export type ConnectedWebsiteUpsertWithWhereUniqueWithoutUserInput = {
    where: ConnectedWebsiteWhereUniqueInput
    update: XOR<ConnectedWebsiteUpdateWithoutUserInput, ConnectedWebsiteUncheckedUpdateWithoutUserInput>
    create: XOR<ConnectedWebsiteCreateWithoutUserInput, ConnectedWebsiteUncheckedCreateWithoutUserInput>
  }

  export type ConnectedWebsiteUpdateWithWhereUniqueWithoutUserInput = {
    where: ConnectedWebsiteWhereUniqueInput
    data: XOR<ConnectedWebsiteUpdateWithoutUserInput, ConnectedWebsiteUncheckedUpdateWithoutUserInput>
  }

  export type ConnectedWebsiteUpdateManyWithWhereWithoutUserInput = {
    where: ConnectedWebsiteScalarWhereInput
    data: XOR<ConnectedWebsiteUpdateManyMutationInput, ConnectedWebsiteUncheckedUpdateManyWithoutUserInput>
  }

  export type ConnectedWebsiteScalarWhereInput = {
    AND?: ConnectedWebsiteScalarWhereInput | ConnectedWebsiteScalarWhereInput[]
    OR?: ConnectedWebsiteScalarWhereInput[]
    NOT?: ConnectedWebsiteScalarWhereInput | ConnectedWebsiteScalarWhereInput[]
    id?: StringFilter<"ConnectedWebsite"> | string
    userId?: StringFilter<"ConnectedWebsite"> | string
    siteUrl?: StringFilter<"ConnectedWebsite"> | string
    apiKey?: StringFilter<"ConnectedWebsite"> | string
    hmacSecret?: StringFilter<"ConnectedWebsite"> | string
    status?: StringFilter<"ConnectedWebsite"> | string
    createdAt?: DateTimeFilter<"ConnectedWebsite"> | Date | string
    updatedAt?: DateTimeFilter<"ConnectedWebsite"> | Date | string
  }

  export type ActionProposalUpsertWithWhereUniqueWithoutUserInput = {
    where: ActionProposalWhereUniqueInput
    update: XOR<ActionProposalUpdateWithoutUserInput, ActionProposalUncheckedUpdateWithoutUserInput>
    create: XOR<ActionProposalCreateWithoutUserInput, ActionProposalUncheckedCreateWithoutUserInput>
  }

  export type ActionProposalUpdateWithWhereUniqueWithoutUserInput = {
    where: ActionProposalWhereUniqueInput
    data: XOR<ActionProposalUpdateWithoutUserInput, ActionProposalUncheckedUpdateWithoutUserInput>
  }

  export type ActionProposalUpdateManyWithWhereWithoutUserInput = {
    where: ActionProposalScalarWhereInput
    data: XOR<ActionProposalUpdateManyMutationInput, ActionProposalUncheckedUpdateManyWithoutUserInput>
  }

  export type ActionProposalScalarWhereInput = {
    AND?: ActionProposalScalarWhereInput | ActionProposalScalarWhereInput[]
    OR?: ActionProposalScalarWhereInput[]
    NOT?: ActionProposalScalarWhereInput | ActionProposalScalarWhereInput[]
    id?: StringFilter<"ActionProposal"> | string
    siteId?: StringFilter<"ActionProposal"> | string
    userId?: StringNullableFilter<"ActionProposal"> | string | null
    targetPageId?: IntFilter<"ActionProposal"> | number
    targetPageTitle?: StringFilter<"ActionProposal"> | string
    targetPageSlug?: StringFilter<"ActionProposal"> | string
    actionType?: StringFilter<"ActionProposal"> | string
    currentValues?: JsonFilter<"ActionProposal">
    proposedValues?: JsonFilter<"ActionProposal">
    approvedChecksum?: StringFilter<"ActionProposal"> | string
    currentChecksum?: StringFilter<"ActionProposal"> | string
    isStale?: BoolFilter<"ActionProposal"> | boolean
    seoProvider?: StringFilter<"ActionProposal"> | string
    adapterSupportLevel?: StringFilter<"ActionProposal"> | string
    rollbackConfidence?: StringFilter<"ActionProposal"> | string
    possibleSideEffects?: JsonFilter<"ActionProposal">
    status?: StringFilter<"ActionProposal"> | string
    createdAt?: DateTimeFilter<"ActionProposal"> | Date | string
    updatedAt?: DateTimeFilter<"ActionProposal"> | Date | string
  }

  export type ActionLogItemUpsertWithWhereUniqueWithoutUserInput = {
    where: ActionLogItemWhereUniqueInput
    update: XOR<ActionLogItemUpdateWithoutUserInput, ActionLogItemUncheckedUpdateWithoutUserInput>
    create: XOR<ActionLogItemCreateWithoutUserInput, ActionLogItemUncheckedCreateWithoutUserInput>
  }

  export type ActionLogItemUpdateWithWhereUniqueWithoutUserInput = {
    where: ActionLogItemWhereUniqueInput
    data: XOR<ActionLogItemUpdateWithoutUserInput, ActionLogItemUncheckedUpdateWithoutUserInput>
  }

  export type ActionLogItemUpdateManyWithWhereWithoutUserInput = {
    where: ActionLogItemScalarWhereInput
    data: XOR<ActionLogItemUpdateManyMutationInput, ActionLogItemUncheckedUpdateManyWithoutUserInput>
  }

  export type ActionLogItemScalarWhereInput = {
    AND?: ActionLogItemScalarWhereInput | ActionLogItemScalarWhereInput[]
    OR?: ActionLogItemScalarWhereInput[]
    NOT?: ActionLogItemScalarWhereInput | ActionLogItemScalarWhereInput[]
    id?: StringFilter<"ActionLogItem"> | string
    siteId?: StringFilter<"ActionLogItem"> | string
    userId?: StringNullableFilter<"ActionLogItem"> | string | null
    actionTitle?: StringFilter<"ActionLogItem"> | string
    targetEntity?: StringFilter<"ActionLogItem"> | string
    executedBy?: StringFilter<"ActionLogItem"> | string
    timestamp?: DateTimeFilter<"ActionLogItem"> | Date | string
    executionState?: StringFilter<"ActionLogItem"> | string
    verificationStatus?: StringFilter<"ActionLogItem"> | string
    rollbackStatus?: StringFilter<"ActionLogItem"> | string
    rollbackConfidence?: StringFilter<"ActionLogItem"> | string
    checksum?: StringFilter<"ActionLogItem"> | string
    snapshotData?: JsonFilter<"ActionLogItem">
    sideEffects?: JsonFilter<"ActionLogItem">
    createdAt?: DateTimeFilter<"ActionLogItem"> | Date | string
  }

  export type UserCreateWithoutConnectedWebsitesInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    sites?: WordPressSiteCreateNestedManyWithoutUserInput
    proposals?: ActionProposalCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConnectedWebsitesInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    sites?: WordPressSiteUncheckedCreateNestedManyWithoutUserInput
    proposals?: ActionProposalUncheckedCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConnectedWebsitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConnectedWebsitesInput, UserUncheckedCreateWithoutConnectedWebsitesInput>
  }

  export type UserUpsertWithoutConnectedWebsitesInput = {
    update: XOR<UserUpdateWithoutConnectedWebsitesInput, UserUncheckedUpdateWithoutConnectedWebsitesInput>
    create: XOR<UserCreateWithoutConnectedWebsitesInput, UserUncheckedCreateWithoutConnectedWebsitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConnectedWebsitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConnectedWebsitesInput, UserUncheckedUpdateWithoutConnectedWebsitesInput>
  }

  export type UserUpdateWithoutConnectedWebsitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    sites?: WordPressSiteUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConnectedWebsitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    sites?: WordPressSiteUncheckedUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUncheckedUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sites?: WordPressSiteCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteCreateNestedManyWithoutUserInput
    proposals?: ActionProposalCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sites?: WordPressSiteUncheckedCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteUncheckedCreateNestedManyWithoutUserInput
    proposals?: ActionProposalUncheckedCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sites?: WordPressSiteUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sites?: WordPressSiteUncheckedUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUncheckedUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUncheckedUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSitesInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteCreateNestedManyWithoutUserInput
    proposals?: ActionProposalCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSitesInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteUncheckedCreateNestedManyWithoutUserInput
    proposals?: ActionProposalUncheckedCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSitesInput, UserUncheckedCreateWithoutSitesInput>
  }

  export type ActionProposalCreateWithoutSiteInput = {
    id?: string
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonNullValueInput | InputJsonValue
    proposedValues: JsonNullValueInput | InputJsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale?: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProposalsInput
  }

  export type ActionProposalUncheckedCreateWithoutSiteInput = {
    id?: string
    userId?: string | null
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonNullValueInput | InputJsonValue
    proposedValues: JsonNullValueInput | InputJsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale?: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionProposalCreateOrConnectWithoutSiteInput = {
    where: ActionProposalWhereUniqueInput
    create: XOR<ActionProposalCreateWithoutSiteInput, ActionProposalUncheckedCreateWithoutSiteInput>
  }

  export type ActionProposalCreateManySiteInputEnvelope = {
    data: ActionProposalCreateManySiteInput | ActionProposalCreateManySiteInput[]
    skipDuplicates?: boolean
  }

  export type ActionLogItemCreateWithoutSiteInput = {
    id?: string
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp?: Date | string
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonNullValueInput | InputJsonValue
    sideEffects: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutActionLogsInput
  }

  export type ActionLogItemUncheckedCreateWithoutSiteInput = {
    id?: string
    userId?: string | null
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp?: Date | string
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonNullValueInput | InputJsonValue
    sideEffects: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActionLogItemCreateOrConnectWithoutSiteInput = {
    where: ActionLogItemWhereUniqueInput
    create: XOR<ActionLogItemCreateWithoutSiteInput, ActionLogItemUncheckedCreateWithoutSiteInput>
  }

  export type ActionLogItemCreateManySiteInputEnvelope = {
    data: ActionLogItemCreateManySiteInput | ActionLogItemCreateManySiteInput[]
    skipDuplicates?: boolean
  }

  export type SiteAuditSummaryCreateWithoutSiteInput = {
    id?: string
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate?: Date | string
    totalIssuesCount?: number
    criticalIssuesCount?: number
    warningIssuesCount?: number
    infoIssuesCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    issues?: AuditIssueCreateNestedManyWithoutAuditSummaryInput
  }

  export type SiteAuditSummaryUncheckedCreateWithoutSiteInput = {
    id?: string
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate?: Date | string
    totalIssuesCount?: number
    criticalIssuesCount?: number
    warningIssuesCount?: number
    infoIssuesCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    issues?: AuditIssueUncheckedCreateNestedManyWithoutAuditSummaryInput
  }

  export type SiteAuditSummaryCreateOrConnectWithoutSiteInput = {
    where: SiteAuditSummaryWhereUniqueInput
    create: XOR<SiteAuditSummaryCreateWithoutSiteInput, SiteAuditSummaryUncheckedCreateWithoutSiteInput>
  }

  export type SiteAuditSummaryCreateManySiteInputEnvelope = {
    data: SiteAuditSummaryCreateManySiteInput | SiteAuditSummaryCreateManySiteInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSitesInput = {
    update: XOR<UserUpdateWithoutSitesInput, UserUncheckedUpdateWithoutSitesInput>
    create: XOR<UserCreateWithoutSitesInput, UserUncheckedCreateWithoutSitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSitesInput, UserUncheckedUpdateWithoutSitesInput>
  }

  export type UserUpdateWithoutSitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUncheckedUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUncheckedUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ActionProposalUpsertWithWhereUniqueWithoutSiteInput = {
    where: ActionProposalWhereUniqueInput
    update: XOR<ActionProposalUpdateWithoutSiteInput, ActionProposalUncheckedUpdateWithoutSiteInput>
    create: XOR<ActionProposalCreateWithoutSiteInput, ActionProposalUncheckedCreateWithoutSiteInput>
  }

  export type ActionProposalUpdateWithWhereUniqueWithoutSiteInput = {
    where: ActionProposalWhereUniqueInput
    data: XOR<ActionProposalUpdateWithoutSiteInput, ActionProposalUncheckedUpdateWithoutSiteInput>
  }

  export type ActionProposalUpdateManyWithWhereWithoutSiteInput = {
    where: ActionProposalScalarWhereInput
    data: XOR<ActionProposalUpdateManyMutationInput, ActionProposalUncheckedUpdateManyWithoutSiteInput>
  }

  export type ActionLogItemUpsertWithWhereUniqueWithoutSiteInput = {
    where: ActionLogItemWhereUniqueInput
    update: XOR<ActionLogItemUpdateWithoutSiteInput, ActionLogItemUncheckedUpdateWithoutSiteInput>
    create: XOR<ActionLogItemCreateWithoutSiteInput, ActionLogItemUncheckedCreateWithoutSiteInput>
  }

  export type ActionLogItemUpdateWithWhereUniqueWithoutSiteInput = {
    where: ActionLogItemWhereUniqueInput
    data: XOR<ActionLogItemUpdateWithoutSiteInput, ActionLogItemUncheckedUpdateWithoutSiteInput>
  }

  export type ActionLogItemUpdateManyWithWhereWithoutSiteInput = {
    where: ActionLogItemScalarWhereInput
    data: XOR<ActionLogItemUpdateManyMutationInput, ActionLogItemUncheckedUpdateManyWithoutSiteInput>
  }

  export type SiteAuditSummaryUpsertWithWhereUniqueWithoutSiteInput = {
    where: SiteAuditSummaryWhereUniqueInput
    update: XOR<SiteAuditSummaryUpdateWithoutSiteInput, SiteAuditSummaryUncheckedUpdateWithoutSiteInput>
    create: XOR<SiteAuditSummaryCreateWithoutSiteInput, SiteAuditSummaryUncheckedCreateWithoutSiteInput>
  }

  export type SiteAuditSummaryUpdateWithWhereUniqueWithoutSiteInput = {
    where: SiteAuditSummaryWhereUniqueInput
    data: XOR<SiteAuditSummaryUpdateWithoutSiteInput, SiteAuditSummaryUncheckedUpdateWithoutSiteInput>
  }

  export type SiteAuditSummaryUpdateManyWithWhereWithoutSiteInput = {
    where: SiteAuditSummaryScalarWhereInput
    data: XOR<SiteAuditSummaryUpdateManyMutationInput, SiteAuditSummaryUncheckedUpdateManyWithoutSiteInput>
  }

  export type SiteAuditSummaryScalarWhereInput = {
    AND?: SiteAuditSummaryScalarWhereInput | SiteAuditSummaryScalarWhereInput[]
    OR?: SiteAuditSummaryScalarWhereInput[]
    NOT?: SiteAuditSummaryScalarWhereInput | SiteAuditSummaryScalarWhereInput[]
    id?: StringFilter<"SiteAuditSummary"> | string
    siteId?: StringFilter<"SiteAuditSummary"> | string
    overallScore?: IntFilter<"SiteAuditSummary"> | number
    seoScore?: IntFilter<"SiteAuditSummary"> | number
    contentScore?: IntFilter<"SiteAuditSummary"> | number
    technicalScore?: IntFilter<"SiteAuditSummary"> | number
    auditDate?: DateTimeFilter<"SiteAuditSummary"> | Date | string
    totalIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    criticalIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    warningIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    infoIssuesCount?: IntFilter<"SiteAuditSummary"> | number
    createdAt?: DateTimeFilter<"SiteAuditSummary"> | Date | string
    updatedAt?: DateTimeFilter<"SiteAuditSummary"> | Date | string
  }

  export type WordPressSiteCreateWithoutProposalsInput = {
    id?: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSitesInput
    actionLogs?: ActionLogItemCreateNestedManyWithoutSiteInput
    audits?: SiteAuditSummaryCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteUncheckedCreateWithoutProposalsInput = {
    id?: string
    userId: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    actionLogs?: ActionLogItemUncheckedCreateNestedManyWithoutSiteInput
    audits?: SiteAuditSummaryUncheckedCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteCreateOrConnectWithoutProposalsInput = {
    where: WordPressSiteWhereUniqueInput
    create: XOR<WordPressSiteCreateWithoutProposalsInput, WordPressSiteUncheckedCreateWithoutProposalsInput>
  }

  export type UserCreateWithoutProposalsInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    sites?: WordPressSiteCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProposalsInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    sites?: WordPressSiteUncheckedCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteUncheckedCreateNestedManyWithoutUserInput
    actionLogs?: ActionLogItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProposalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProposalsInput, UserUncheckedCreateWithoutProposalsInput>
  }

  export type WordPressSiteUpsertWithoutProposalsInput = {
    update: XOR<WordPressSiteUpdateWithoutProposalsInput, WordPressSiteUncheckedUpdateWithoutProposalsInput>
    create: XOR<WordPressSiteCreateWithoutProposalsInput, WordPressSiteUncheckedCreateWithoutProposalsInput>
    where?: WordPressSiteWhereInput
  }

  export type WordPressSiteUpdateToOneWithWhereWithoutProposalsInput = {
    where?: WordPressSiteWhereInput
    data: XOR<WordPressSiteUpdateWithoutProposalsInput, WordPressSiteUncheckedUpdateWithoutProposalsInput>
  }

  export type WordPressSiteUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSitesNestedInput
    actionLogs?: ActionLogItemUpdateManyWithoutSiteNestedInput
    audits?: SiteAuditSummaryUpdateManyWithoutSiteNestedInput
  }

  export type WordPressSiteUncheckedUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionLogs?: ActionLogItemUncheckedUpdateManyWithoutSiteNestedInput
    audits?: SiteAuditSummaryUncheckedUpdateManyWithoutSiteNestedInput
  }

  export type UserUpsertWithoutProposalsInput = {
    update: XOR<UserUpdateWithoutProposalsInput, UserUncheckedUpdateWithoutProposalsInput>
    create: XOR<UserCreateWithoutProposalsInput, UserUncheckedCreateWithoutProposalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProposalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProposalsInput, UserUncheckedUpdateWithoutProposalsInput>
  }

  export type UserUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    sites?: WordPressSiteUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    sites?: WordPressSiteUncheckedUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUncheckedUpdateManyWithoutUserNestedInput
    actionLogs?: ActionLogItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WordPressSiteCreateWithoutActionLogsInput = {
    id?: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSitesInput
    proposals?: ActionProposalCreateNestedManyWithoutSiteInput
    audits?: SiteAuditSummaryCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteUncheckedCreateWithoutActionLogsInput = {
    id?: string
    userId: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proposals?: ActionProposalUncheckedCreateNestedManyWithoutSiteInput
    audits?: SiteAuditSummaryUncheckedCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteCreateOrConnectWithoutActionLogsInput = {
    where: WordPressSiteWhereUniqueInput
    create: XOR<WordPressSiteCreateWithoutActionLogsInput, WordPressSiteUncheckedCreateWithoutActionLogsInput>
  }

  export type UserCreateWithoutActionLogsInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    sites?: WordPressSiteCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteCreateNestedManyWithoutUserInput
    proposals?: ActionProposalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActionLogsInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    role?: string
    agencyName?: string | null
    apiKey?: string | null
    avatar?: string | null
    auditSchedule?: string
    staleProtection?: boolean
    autoPurgeCache?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    sites?: WordPressSiteUncheckedCreateNestedManyWithoutUserInput
    connectedWebsites?: ConnectedWebsiteUncheckedCreateNestedManyWithoutUserInput
    proposals?: ActionProposalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActionLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActionLogsInput, UserUncheckedCreateWithoutActionLogsInput>
  }

  export type WordPressSiteUpsertWithoutActionLogsInput = {
    update: XOR<WordPressSiteUpdateWithoutActionLogsInput, WordPressSiteUncheckedUpdateWithoutActionLogsInput>
    create: XOR<WordPressSiteCreateWithoutActionLogsInput, WordPressSiteUncheckedCreateWithoutActionLogsInput>
    where?: WordPressSiteWhereInput
  }

  export type WordPressSiteUpdateToOneWithWhereWithoutActionLogsInput = {
    where?: WordPressSiteWhereInput
    data: XOR<WordPressSiteUpdateWithoutActionLogsInput, WordPressSiteUncheckedUpdateWithoutActionLogsInput>
  }

  export type WordPressSiteUpdateWithoutActionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSitesNestedInput
    proposals?: ActionProposalUpdateManyWithoutSiteNestedInput
    audits?: SiteAuditSummaryUpdateManyWithoutSiteNestedInput
  }

  export type WordPressSiteUncheckedUpdateWithoutActionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposals?: ActionProposalUncheckedUpdateManyWithoutSiteNestedInput
    audits?: SiteAuditSummaryUncheckedUpdateManyWithoutSiteNestedInput
  }

  export type UserUpsertWithoutActionLogsInput = {
    update: XOR<UserUpdateWithoutActionLogsInput, UserUncheckedUpdateWithoutActionLogsInput>
    create: XOR<UserCreateWithoutActionLogsInput, UserUncheckedCreateWithoutActionLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActionLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActionLogsInput, UserUncheckedUpdateWithoutActionLogsInput>
  }

  export type UserUpdateWithoutActionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    sites?: WordPressSiteUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    agencyName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    auditSchedule?: StringFieldUpdateOperationsInput | string
    staleProtection?: BoolFieldUpdateOperationsInput | boolean
    autoPurgeCache?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    sites?: WordPressSiteUncheckedUpdateManyWithoutUserNestedInput
    connectedWebsites?: ConnectedWebsiteUncheckedUpdateManyWithoutUserNestedInput
    proposals?: ActionProposalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WordPressSiteCreateWithoutAuditsInput = {
    id?: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSitesInput
    proposals?: ActionProposalCreateNestedManyWithoutSiteInput
    actionLogs?: ActionLogItemCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteUncheckedCreateWithoutAuditsInput = {
    id?: string
    userId: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proposals?: ActionProposalUncheckedCreateNestedManyWithoutSiteInput
    actionLogs?: ActionLogItemUncheckedCreateNestedManyWithoutSiteInput
  }

  export type WordPressSiteCreateOrConnectWithoutAuditsInput = {
    where: WordPressSiteWhereUniqueInput
    create: XOR<WordPressSiteCreateWithoutAuditsInput, WordPressSiteUncheckedCreateWithoutAuditsInput>
  }

  export type AuditIssueCreateWithoutAuditSummaryInput = {
    id?: string
    category: string
    severity: string
    title: string
    description: string
    affectedUrl: string
    pageTitle: string
    recommendation: string
    autoFixable?: boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditIssueUncheckedCreateWithoutAuditSummaryInput = {
    id?: string
    category: string
    severity: string
    title: string
    description: string
    affectedUrl: string
    pageTitle: string
    recommendation: string
    autoFixable?: boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditIssueCreateOrConnectWithoutAuditSummaryInput = {
    where: AuditIssueWhereUniqueInput
    create: XOR<AuditIssueCreateWithoutAuditSummaryInput, AuditIssueUncheckedCreateWithoutAuditSummaryInput>
  }

  export type AuditIssueCreateManyAuditSummaryInputEnvelope = {
    data: AuditIssueCreateManyAuditSummaryInput | AuditIssueCreateManyAuditSummaryInput[]
    skipDuplicates?: boolean
  }

  export type WordPressSiteUpsertWithoutAuditsInput = {
    update: XOR<WordPressSiteUpdateWithoutAuditsInput, WordPressSiteUncheckedUpdateWithoutAuditsInput>
    create: XOR<WordPressSiteCreateWithoutAuditsInput, WordPressSiteUncheckedCreateWithoutAuditsInput>
    where?: WordPressSiteWhereInput
  }

  export type WordPressSiteUpdateToOneWithWhereWithoutAuditsInput = {
    where?: WordPressSiteWhereInput
    data: XOR<WordPressSiteUpdateWithoutAuditsInput, WordPressSiteUncheckedUpdateWithoutAuditsInput>
  }

  export type WordPressSiteUpdateWithoutAuditsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSitesNestedInput
    proposals?: ActionProposalUpdateManyWithoutSiteNestedInput
    actionLogs?: ActionLogItemUpdateManyWithoutSiteNestedInput
  }

  export type WordPressSiteUncheckedUpdateWithoutAuditsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposals?: ActionProposalUncheckedUpdateManyWithoutSiteNestedInput
    actionLogs?: ActionLogItemUncheckedUpdateManyWithoutSiteNestedInput
  }

  export type AuditIssueUpsertWithWhereUniqueWithoutAuditSummaryInput = {
    where: AuditIssueWhereUniqueInput
    update: XOR<AuditIssueUpdateWithoutAuditSummaryInput, AuditIssueUncheckedUpdateWithoutAuditSummaryInput>
    create: XOR<AuditIssueCreateWithoutAuditSummaryInput, AuditIssueUncheckedCreateWithoutAuditSummaryInput>
  }

  export type AuditIssueUpdateWithWhereUniqueWithoutAuditSummaryInput = {
    where: AuditIssueWhereUniqueInput
    data: XOR<AuditIssueUpdateWithoutAuditSummaryInput, AuditIssueUncheckedUpdateWithoutAuditSummaryInput>
  }

  export type AuditIssueUpdateManyWithWhereWithoutAuditSummaryInput = {
    where: AuditIssueScalarWhereInput
    data: XOR<AuditIssueUpdateManyMutationInput, AuditIssueUncheckedUpdateManyWithoutAuditSummaryInput>
  }

  export type AuditIssueScalarWhereInput = {
    AND?: AuditIssueScalarWhereInput | AuditIssueScalarWhereInput[]
    OR?: AuditIssueScalarWhereInput[]
    NOT?: AuditIssueScalarWhereInput | AuditIssueScalarWhereInput[]
    id?: StringFilter<"AuditIssue"> | string
    auditSummaryId?: StringFilter<"AuditIssue"> | string
    category?: StringFilter<"AuditIssue"> | string
    severity?: StringFilter<"AuditIssue"> | string
    title?: StringFilter<"AuditIssue"> | string
    description?: StringFilter<"AuditIssue"> | string
    affectedUrl?: StringFilter<"AuditIssue"> | string
    pageTitle?: StringFilter<"AuditIssue"> | string
    recommendation?: StringFilter<"AuditIssue"> | string
    autoFixable?: BoolFilter<"AuditIssue"> | boolean
    actionPayload?: JsonNullableFilter<"AuditIssue">
    createdAt?: DateTimeFilter<"AuditIssue"> | Date | string
  }

  export type SiteAuditSummaryCreateWithoutIssuesInput = {
    id?: string
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate?: Date | string
    totalIssuesCount?: number
    criticalIssuesCount?: number
    warningIssuesCount?: number
    infoIssuesCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    site: WordPressSiteCreateNestedOneWithoutAuditsInput
  }

  export type SiteAuditSummaryUncheckedCreateWithoutIssuesInput = {
    id?: string
    siteId: string
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate?: Date | string
    totalIssuesCount?: number
    criticalIssuesCount?: number
    warningIssuesCount?: number
    infoIssuesCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteAuditSummaryCreateOrConnectWithoutIssuesInput = {
    where: SiteAuditSummaryWhereUniqueInput
    create: XOR<SiteAuditSummaryCreateWithoutIssuesInput, SiteAuditSummaryUncheckedCreateWithoutIssuesInput>
  }

  export type SiteAuditSummaryUpsertWithoutIssuesInput = {
    update: XOR<SiteAuditSummaryUpdateWithoutIssuesInput, SiteAuditSummaryUncheckedUpdateWithoutIssuesInput>
    create: XOR<SiteAuditSummaryCreateWithoutIssuesInput, SiteAuditSummaryUncheckedCreateWithoutIssuesInput>
    where?: SiteAuditSummaryWhereInput
  }

  export type SiteAuditSummaryUpdateToOneWithWhereWithoutIssuesInput = {
    where?: SiteAuditSummaryWhereInput
    data: XOR<SiteAuditSummaryUpdateWithoutIssuesInput, SiteAuditSummaryUncheckedUpdateWithoutIssuesInput>
  }

  export type SiteAuditSummaryUpdateWithoutIssuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallScore?: IntFieldUpdateOperationsInput | number
    seoScore?: IntFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    technicalScore?: IntFieldUpdateOperationsInput | number
    auditDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIssuesCount?: IntFieldUpdateOperationsInput | number
    criticalIssuesCount?: IntFieldUpdateOperationsInput | number
    warningIssuesCount?: IntFieldUpdateOperationsInput | number
    infoIssuesCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    site?: WordPressSiteUpdateOneRequiredWithoutAuditsNestedInput
  }

  export type SiteAuditSummaryUncheckedUpdateWithoutIssuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    overallScore?: IntFieldUpdateOperationsInput | number
    seoScore?: IntFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    technicalScore?: IntFieldUpdateOperationsInput | number
    auditDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIssuesCount?: IntFieldUpdateOperationsInput | number
    criticalIssuesCount?: IntFieldUpdateOperationsInput | number
    warningIssuesCount?: IntFieldUpdateOperationsInput | number
    infoIssuesCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WordPressSiteCreateManyUserInput = {
    id?: string
    name: string
    url: string
    adminEmail: string
    connectionState?: string
    health: JsonNullValueInput | InputJsonValue
    seoProvider: JsonNullValueInput | InputJsonValue
    acfVersion?: string | null
    themeName?: string
    lastAuditedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectedWebsiteCreateManyUserInput = {
    id?: string
    siteUrl: string
    apiKey: string
    hmacSecret: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionProposalCreateManyUserInput = {
    id?: string
    siteId: string
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonNullValueInput | InputJsonValue
    proposedValues: JsonNullValueInput | InputJsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale?: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionLogItemCreateManyUserInput = {
    id?: string
    siteId: string
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp?: Date | string
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonNullValueInput | InputJsonValue
    sideEffects: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordPressSiteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposals?: ActionProposalUpdateManyWithoutSiteNestedInput
    actionLogs?: ActionLogItemUpdateManyWithoutSiteNestedInput
    audits?: SiteAuditSummaryUpdateManyWithoutSiteNestedInput
  }

  export type WordPressSiteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposals?: ActionProposalUncheckedUpdateManyWithoutSiteNestedInput
    actionLogs?: ActionLogItemUncheckedUpdateManyWithoutSiteNestedInput
    audits?: SiteAuditSummaryUncheckedUpdateManyWithoutSiteNestedInput
  }

  export type WordPressSiteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    adminEmail?: StringFieldUpdateOperationsInput | string
    connectionState?: StringFieldUpdateOperationsInput | string
    health?: JsonNullValueInput | InputJsonValue
    seoProvider?: JsonNullValueInput | InputJsonValue
    acfVersion?: NullableStringFieldUpdateOperationsInput | string | null
    themeName?: StringFieldUpdateOperationsInput | string
    lastAuditedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectedWebsiteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteUrl?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    hmacSecret?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectedWebsiteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteUrl?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    hmacSecret?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectedWebsiteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteUrl?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    hmacSecret?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionProposalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    site?: WordPressSiteUpdateOneRequiredWithoutProposalsNestedInput
  }

  export type ActionProposalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionProposalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogItemUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    site?: WordPressSiteUpdateOneRequiredWithoutActionLogsNestedInput
  }

  export type ActionLogItemUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogItemUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteId?: StringFieldUpdateOperationsInput | string
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionProposalCreateManySiteInput = {
    id?: string
    userId?: string | null
    targetPageId: number
    targetPageTitle: string
    targetPageSlug: string
    actionType: string
    currentValues: JsonNullValueInput | InputJsonValue
    proposedValues: JsonNullValueInput | InputJsonValue
    approvedChecksum: string
    currentChecksum: string
    isStale?: boolean
    seoProvider: string
    adapterSupportLevel: string
    rollbackConfidence: string
    possibleSideEffects: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionLogItemCreateManySiteInput = {
    id?: string
    userId?: string | null
    actionTitle: string
    targetEntity: string
    executedBy: string
    timestamp?: Date | string
    executionState: string
    verificationStatus: string
    rollbackStatus: string
    rollbackConfidence: string
    checksum: string
    snapshotData: JsonNullValueInput | InputJsonValue
    sideEffects: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SiteAuditSummaryCreateManySiteInput = {
    id?: string
    overallScore: number
    seoScore: number
    contentScore: number
    technicalScore: number
    auditDate?: Date | string
    totalIssuesCount?: number
    criticalIssuesCount?: number
    warningIssuesCount?: number
    infoIssuesCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionProposalUpdateWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProposalsNestedInput
  }

  export type ActionProposalUncheckedUpdateWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionProposalUncheckedUpdateManyWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    targetPageId?: IntFieldUpdateOperationsInput | number
    targetPageTitle?: StringFieldUpdateOperationsInput | string
    targetPageSlug?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    currentValues?: JsonNullValueInput | InputJsonValue
    proposedValues?: JsonNullValueInput | InputJsonValue
    approvedChecksum?: StringFieldUpdateOperationsInput | string
    currentChecksum?: StringFieldUpdateOperationsInput | string
    isStale?: BoolFieldUpdateOperationsInput | boolean
    seoProvider?: StringFieldUpdateOperationsInput | string
    adapterSupportLevel?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    possibleSideEffects?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogItemUpdateWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutActionLogsNestedInput
  }

  export type ActionLogItemUncheckedUpdateWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogItemUncheckedUpdateManyWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    actionTitle?: StringFieldUpdateOperationsInput | string
    targetEntity?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    executionState?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    rollbackStatus?: StringFieldUpdateOperationsInput | string
    rollbackConfidence?: StringFieldUpdateOperationsInput | string
    checksum?: StringFieldUpdateOperationsInput | string
    snapshotData?: JsonNullValueInput | InputJsonValue
    sideEffects?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteAuditSummaryUpdateWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallScore?: IntFieldUpdateOperationsInput | number
    seoScore?: IntFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    technicalScore?: IntFieldUpdateOperationsInput | number
    auditDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIssuesCount?: IntFieldUpdateOperationsInput | number
    criticalIssuesCount?: IntFieldUpdateOperationsInput | number
    warningIssuesCount?: IntFieldUpdateOperationsInput | number
    infoIssuesCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issues?: AuditIssueUpdateManyWithoutAuditSummaryNestedInput
  }

  export type SiteAuditSummaryUncheckedUpdateWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallScore?: IntFieldUpdateOperationsInput | number
    seoScore?: IntFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    technicalScore?: IntFieldUpdateOperationsInput | number
    auditDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIssuesCount?: IntFieldUpdateOperationsInput | number
    criticalIssuesCount?: IntFieldUpdateOperationsInput | number
    warningIssuesCount?: IntFieldUpdateOperationsInput | number
    infoIssuesCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    issues?: AuditIssueUncheckedUpdateManyWithoutAuditSummaryNestedInput
  }

  export type SiteAuditSummaryUncheckedUpdateManyWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallScore?: IntFieldUpdateOperationsInput | number
    seoScore?: IntFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    technicalScore?: IntFieldUpdateOperationsInput | number
    auditDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalIssuesCount?: IntFieldUpdateOperationsInput | number
    criticalIssuesCount?: IntFieldUpdateOperationsInput | number
    warningIssuesCount?: IntFieldUpdateOperationsInput | number
    infoIssuesCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditIssueCreateManyAuditSummaryInput = {
    id?: string
    category: string
    severity: string
    title: string
    description: string
    affectedUrl: string
    pageTitle: string
    recommendation: string
    autoFixable?: boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditIssueUpdateWithoutAuditSummaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    affectedUrl?: StringFieldUpdateOperationsInput | string
    pageTitle?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    autoFixable?: BoolFieldUpdateOperationsInput | boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditIssueUncheckedUpdateWithoutAuditSummaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    affectedUrl?: StringFieldUpdateOperationsInput | string
    pageTitle?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    autoFixable?: BoolFieldUpdateOperationsInput | boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditIssueUncheckedUpdateManyWithoutAuditSummaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    affectedUrl?: StringFieldUpdateOperationsInput | string
    pageTitle?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    autoFixable?: BoolFieldUpdateOperationsInput | boolean
    actionPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}