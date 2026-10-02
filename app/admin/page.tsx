"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  Droplets,
  RefreshCw,
  ChevronDown,
  CheckCircle2,
  XCircle,
  User,
  Gauge,
  Wallet,
  ShieldCheck,
  Loader2,
  Unlock,
  Lock,
  Power,
} from "lucide-react"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL

type ClosureSource =
  | "NONE"
  | "CLIENT"
  | "MANAGEMENT"

type Meter = {
  id: number
  user: number | null
  meter_number: string
  status: string
  is_active: boolean
  balance: string
  valve_open: boolean
  closure_source: ClosureSource
}

export default function AdminPage() {

  const [meters, setMeters] =
    useState<Meter[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  const [controllingMeter, setControllingMeter] =
    useState<number | null>(null)

  const [activatingMeter, setActivatingMeter] =
    useState<number | null>(null)

  const [openMenu, setOpenMenu] =
    useState<number | null>(null)

  /*
   * ------------------------------------------------
   * AUTHENTICATION
   * ------------------------------------------------
   */

  const getToken = () => {

    return (
      localStorage.getItem(
        "auth_token"
      ) ||
      sessionStorage.getItem(
        "auth_token"
      )
    )

  }

  /*
   * ------------------------------------------------
   * FETCH METERS
   * ------------------------------------------------
   */

  const fetchMeters = async () => {

    try {

      setLoading(true)
      setError("")

      const token = getToken()

      if (!token) {

        setError(
          "You are not authenticated."
        )

        return

      }

      const response =
        await fetch(
          `${API_URL}/meters/`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Token ${token}`,

              "Content-Type":
                "application/json",
            },

            cache: "no-store",
          }
        )

      const data =
        await response.json()

      if (!response.ok) {

        throw new Error(
          data.detail ||
          data.error ||
          "Failed to fetch meters."
        )

      }

      setMeters(data)

    } catch (error) {

      console.error(
        "Failed to fetch meters:",
        error
      )

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch meters."
      )

    } finally {

      setLoading(false)

    }

  }

  /*
   * ------------------------------------------------
   * METER ACTIVATION
   * ------------------------------------------------
   */

  const toggleMeterActivation = async (
    meterId: number,
    isActive: boolean
  ) => {

    try {

      setActivatingMeter(
        meterId
      )

      setError("")
      setOpenMenu(null)

      const token =
        getToken()

      if (!token) {

        setError(
          "You are not authenticated."
        )

        return

      }

      const action =
        isActive
          ? "deactivate"
          : "activate"

      const response =
        await fetch(
          `${API_URL}/meters/${meterId}/${action}/`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Token ${token}`,

              "Content-Type":
                "application/json",
            },
          }
        )

      const data =
        await response.json()

      if (!response.ok) {

        throw new Error(
          data.detail ||
          data.error ||
          `Failed to ${
            isActive
              ? "deactivate"
              : "activate"
          } meter.`
        )

      }

      /*
       * Update the UI immediately using
       * Django's response.
       */

      setMeters(
        (currentMeters) =>
          currentMeters.map(
            (meter) =>
              meter.id === meterId
                ? {
                    ...meter,

                    is_active:
                      data.is_active,
                  }
                : meter
          )
      )

    } catch (error) {

      console.error(
        "Meter activation control failed:",
        error
      )

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update meter."
      )

    } finally {

      setActivatingMeter(
        null
      )

    }

  }

  /*
   * ------------------------------------------------
   * ADMIN VALVE CONTROL
   * ------------------------------------------------
   */

  const controlValve = async (
    meterId: number,
    valveOpen: boolean
  ) => {

    try {

      setControllingMeter(
        meterId
      )

      setError("")
      setOpenMenu(null)

      const token =
        getToken()

      if (!token) {

        setError(
          "You are not authenticated."
        )

        return

      }

      const response =
        await fetch(
          `${API_URL}/meters/${meterId}/valve/`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Token ${token}`,

              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              valve_open:
                valveOpen,
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {

        throw new Error(
          data.detail ||
          data.error ||
          "Failed to control valve."
        )

      }

      /*
       * Update the admin UI immediately
       * using Django's response.
       *
       * The WebSocket will also broadcast
       * this change to all connected clients.
       */

      setMeters(
        (currentMeters) =>
          currentMeters.map(
            (meter) =>
              meter.id === meterId
                ? {
                    ...meter,

                    valve_open:
                      data.valve_open,

                    closure_source:
                      data.closure_source,
                  }
                : meter
          )
      )

    } catch (error) {

      console.error(
        "Valve control failed:",
        error
      )

      setError(
        error instanceof Error
          ? error.message
          : "Failed to control valve."
      )

    } finally {

      setControllingMeter(
        null
      )

    }

  }

  /*
   * ------------------------------------------------
   * INITIAL DATA
   * ------------------------------------------------
   */

  useEffect(() => {

    fetchMeters()

  }, [])

  /*
   * ------------------------------------------------
   * ADMIN WEBSOCKET CONNECTIONS
   * ------------------------------------------------
   *
   * The admin needs a WebSocket connection for
   * every meter so that valve changes made by
   * tenants are reflected immediately.
   *
   * Activation/deactivation is intentionally
   * handled through the REST API because it is
   * management configuration rather than telemetry.
   *
   */

  useEffect(() => {

    /*
     * Do not create connections until
     * the meters have been loaded.
     */

    if (meters.length === 0) {

      return

    }

    const sockets: WebSocket[] = []

    meters.forEach(
      (meter) => {

        const socket =
          new WebSocket(
            `${WS_URL}/ws/telemetry/${meter.id}/`
          )

        socket.onopen = () => {

          console.log(
            `Admin WebSocket connected for meter ${meter.id}`
          )

        }

        socket.onmessage = (
          event
        ) => {

          try {

            const message =
              JSON.parse(
                event.data
              )

            /*
             * ------------------------------------
             * VALVE STATUS
             * ------------------------------------
             */

            if (
              message.type ===
              "valve_status"
            ) {

              const {
                meter_id,
                valve_open,
                closure_source,
              } = message.data

              console.log(
                "Admin received valve update:",
                message.data
              )

              setMeters(
                (currentMeters) =>
                  currentMeters.map(
                    (currentMeter) =>
                      currentMeter.id ===
                      meter_id
                        ? {
                            ...currentMeter,

                            valve_open:
                              valve_open,

                            closure_source:
                              closure_source,
                          }
                        : currentMeter
                  )
              )

              return

            }

            /*
             * ------------------------------------
             * TELEMETRY
             * ------------------------------------
             *
             * The admin currently does not need
             * to display live telemetry here.
             */

            if (
              message.type ===
              "telemetry_update"
            ) {

              return

            }

          } catch (error) {

            console.error(
              "Failed to process admin WebSocket message:",
              error
            )

          }

        }

        socket.onerror = (
          error
        ) => {

          console.error(
            `Admin WebSocket error for meter ${meter.id}:`,
            error
          )

        }

        socket.onclose = () => {

          console.log(
            `Admin WebSocket disconnected for meter ${meter.id}`
          )

        }

        sockets.push(socket)

      }
    )

    /*
     * Close all sockets when the component
     * is unmounted or the meter count changes.
     */

    return () => {

      sockets.forEach(
        (socket) => {

          socket.close()

        }
      )

    }

  }, [meters.length])

  /*
   * ------------------------------------------------
   * SUMMARY VALUES
   * ------------------------------------------------
   */

  const totalMeters =
    meters.length

  const activeMeters =
    meters.filter(
      (meter) =>
        meter.is_active
    ).length

  const inactiveMeters =
    meters.filter(
      (meter) =>
        !meter.is_active
    ).length

  const onlineMeters =
    meters.filter(
      (meter) =>
        meter.status ===
        "ONLINE"
    ).length

  const openValves =
    meters.filter(
      (meter) =>
        meter.valve_open
    ).length

  const closedValves =
    meters.filter(
      (meter) =>
        !meter.valve_open
    ).length

  return (

    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              {/* Brand accent */}

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-sm">

                <Droplets
                  className="h-6 w-6 text-white"
                />

              </div>

              <div>

                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Water Meters
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor and manage registered water meters.
                </p>

              </div>

            </div>

            {/* Refresh */}

            <button
              onClick={fetchMeters}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <RefreshCw
                className={`h-4 w-4 ${
                  loading
                    ? "animate-spin"
                    : ""
                }`}
              />

              {loading
                ? "Refreshing..."
                : "Refresh"}

            </button>

          </div>

        </div>

      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Error */}

        {error && (

          <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            <XCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <span>{error}</span>

          </div>

        )}

        {/* Summary */}

        {!loading &&
          meters.length > 0 && (

            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

              {/* Total */}

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Total meters
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                      {totalMeters}
                    </p>

                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">

                    <Gauge className="h-5 w-5 text-blue-600" />

                  </div>

                </div>

              </div>

              {/* Active */}

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Active
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                      {activeMeters}
                    </p>

                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">

                    <Power className="h-5 w-5 text-green-600" />

                  </div>

                </div>

              </div>

              {/* Inactive */}

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Inactive
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                      {inactiveMeters}
                    </p>

                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">

                    <Power className="h-5 w-5 text-slate-500" />

                  </div>

                </div>

              </div>

              {/* Online */}

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Online
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                      {onlineMeters}
                    </p>

                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">

                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                  </div>

                </div>

              </div>

              {/* Valves */}

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Valves open
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                      {openValves}
                    </p>

                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">

                    <Unlock className="h-5 w-5 text-emerald-600" />

                  </div>

                </div>

              </div>

            </div>

          )}

        {/* Table */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-4">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-base font-semibold text-slate-900">
                  Registered meters
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage connections, valve access, and meter status.
                </p>

              </div>

              {!loading && (

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">

                  {meters.length} meter
                  {meters.length !== 1
                    ? "s"
                    : ""}

                </span>

              )}

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px] text-left">

              <thead className="border-b border-slate-200 bg-slate-50">

                <tr>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Meter
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tenant
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Connection
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Balance
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Valve
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Closure
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {loading ? (

                  <tr>

                    <td
                      colSpan={8}
                      className="px-6 py-16 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />

                        <p className="mt-3 text-sm text-slate-500">
                          Loading meters...
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : meters.length === 0 ? (

                  <tr>

                    <td
                      colSpan={8}
                      className="px-6 py-16 text-center"
                    >

                      <Gauge className="mx-auto h-8 w-8 text-blue-300" />

                      <p className="mt-3 text-sm text-slate-500">
                        No meters registered.
                      </p>

                    </td>

                  </tr>

                ) : (

                  meters.map(
                    (meter) => {

                      const isControlling =
                        controllingMeter ===
                        meter.id

                      const isActivating =
                        activatingMeter ===
                        meter.id

                      const menuOpen =
                        openMenu ===
                        meter.id

                      return (

                        <tr
                          key={meter.id}
                          className="transition hover:bg-slate-50"
                        >

                          {/* Meter */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">

                                <Droplets className="h-4 w-4 text-blue-600" />

                              </div>

                              <div>

                                <div className="font-medium text-slate-900">
                                  {meter.meter_number}
                                </div>

                                <div className="mt-0.5 text-xs text-slate-400">
                                  ID #{meter.id}
                                </div>

                              </div>

                            </div>

                          </td>

                          {/* Tenant */}

                          <td className="px-6 py-4">

                            {meter.user ? (

                              <div className="flex items-center gap-2">

                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50">

                                  <User className="h-3.5 w-3.5 text-blue-600" />

                                </div>

                                <span className="text-sm text-slate-700">
                                  User #{meter.user}
                                </span>

                              </div>

                            ) : (

                              <span className="text-sm text-slate-400">
                                Unassigned
                              </span>

                            )}

                          </td>

                          {/* Connection */}

                          <td className="px-6 py-4">

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                meter.is_active
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >

                              <Power className="h-3.5 w-3.5" />

                              {meter.is_active
                                ? "Active"
                                : "Inactive"}

                            </span>

                          </td>

                          {/* Status */}

                          <td className="px-6 py-4">

                            <div className="inline-flex items-center gap-2">

                              <span
                                className={`h-2 w-2 rounded-full ${
                                  meter.status ===
                                  "ONLINE"
                                    ? "bg-green-500"
                                    : "bg-slate-400"
                                }`}
                              />

                              <span className="text-sm text-slate-700">
                                {meter.status}
                              </span>

                            </div>

                          </td>

                          {/* Balance */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-2">

                              <Wallet className="h-4 w-4 text-blue-500" />

                              <span className="text-sm font-medium text-slate-900">
                                {meter.balance}
                              </span>

                            </div>

                          </td>

                          {/* Valve */}

                          <td className="px-6 py-4">

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                meter.valve_open
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-red-50 text-red-700"
                              }`}
                            >

                              {meter.valve_open ? (

                                <CheckCircle2 className="h-3.5 w-3.5" />

                              ) : (

                                <XCircle className="h-3.5 w-3.5" />

                              )}

                              {meter.valve_open
                                ? "Open"
                                : "Closed"}

                            </span>

                          </td>

                          {/* Closure */}

                          <td className="px-6 py-4">

                            {meter.closure_source ===
                            "NONE" ? (

                              <span className="text-sm text-slate-400">
                                —
                              </span>

                            ) : (

                              <span
                                className={`inline-flex items-center gap-1.5 text-sm ${
                                  meter.closure_source ===
                                  "MANAGEMENT"
                                    ? "text-amber-700"
                                    : "text-slate-600"
                                }`}
                              >

                                <ShieldCheck className="h-4 w-4" />

                                {meter.closure_source ===
                                "MANAGEMENT"
                                  ? "Management"
                                  : "Client"}

                              </span>

                            )}

                          </td>

                          {/* Actions */}

                          <td className="relative px-6 py-4 text-right">

                            <button
                              onClick={() =>
                                setOpenMenu(
                                  menuOpen
                                    ? null
                                    : meter.id
                                )
                              }
                              className="inline-flex h-9 items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 text-sm font-medium text-blue-700 shadow-sm transition hover:bg-blue-50"
                            >

                              Actions

                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  menuOpen
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />

                            </button>

                            {menuOpen && (

                              <div className="absolute right-6 z-20 mt-2 w-60 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg">

                                {/* Connection control */}

                                {meter.is_active ? (

                                  <button
                                    onClick={() =>
                                      toggleMeterActivation(
                                        meter.id,
                                        true
                                      )
                                    }
                                    disabled={
                                      isActivating
                                    }
                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >

                                    {isActivating ? (

                                      <Loader2 className="h-4 w-4 animate-spin" />

                                    ) : (

                                      <Power className="h-4 w-4" />

                                    )}

                                    {isActivating
                                      ? "Deactivating..."
                                      : "Deactivate meter"}

                                  </button>

                                ) : (

                                  <button
                                    onClick={() =>
                                      toggleMeterActivation(
                                        meter.id,
                                        false
                                      )
                                    }
                                    disabled={
                                      isActivating
                                    }
                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >

                                    {isActivating ? (

                                      <Loader2 className="h-4 w-4 animate-spin" />

                                    ) : (

                                      <Power className="h-4 w-4" />

                                    )}

                                    {isActivating
                                      ? "Activating..."
                                      : "Activate meter"}

                                  </button>

                                )}

                                {/* Valve control */}

                                {meter.valve_open ? (

                                  <button
                                    onClick={() =>
                                      controlValve(
                                        meter.id,
                                        false
                                      )
                                    }
                                    disabled={
                                      isControlling
                                    }
                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >

                                    {isControlling ? (

                                      <Loader2 className="h-4 w-4 animate-spin" />

                                    ) : (

                                      <Lock className="h-4 w-4" />

                                    )}

                                    {isControlling
                                      ? "Closing..."
                                      : "Close valve"}

                                  </button>

                                ) : (

                                  <button
                                    onClick={() =>
                                      controlValve(
                                        meter.id,
                                        true
                                      )
                                    }
                                    disabled={
                                      isControlling
                                    }
                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >

                                    {isControlling ? (

                                      <Loader2 className="h-4 w-4 animate-spin" />

                                    ) : (

                                      <Unlock className="h-4 w-4" />

                                    )}

                                    {isControlling
                                      ? "Opening..."
                                      : "Open valve"}

                                  </button>

                                )}

                                {/* Close menu */}

                                <button
                                  onClick={() =>
                                    setOpenMenu(null)
                                  }
                                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
                                >

                                  <Gauge className="h-4 w-4" />

                                  View details

                                </button>

                              </div>

                            )}

                          </td>

                        </tr>

                      )

                    }
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>

  )
}
