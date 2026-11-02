import { useMemo, useState } from "react";
import { Iztrolabe } from "react-iztro";

// iztro 时辰索引 -> 时辰名称（0 早子时 … 12 晚子时），对应 CHINESE_TIME
const TIME_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: "早子时 (00:00~01:00)" },
  { value: 1, label: "丑时 (01:00~03:00)" },
  { value: 2, label: "寅时 (03:00~05:00)" },
  { value: 3, label: "卯时 (05:00~07:00)" },
  { value: 4, label: "辰时 (07:00~09:00)" },
  { value: 5, label: "巳时 (09:00~11:00)" },
  { value: 6, label: "午时 (11:00~13:00)" },
  { value: 7, label: "未时 (13:00~15:00)" },
  { value: 8, label: "申时 (15:00~17:00)" },
  { value: 9, label: "酉时 (17:00~19:00)" },
  { value: 10, label: "戌时 (19:00~21:00)" },
  { value: 11, label: "亥时 (21:00~23:00)" },
  { value: 12, label: "晚子时 (23:00~00:00)" },
];

interface FormState {
  birthday: string;
  birthTime: number;
  gender: "male" | "female";
  birthdayType: "lunar" | "solar";
  isLeapMonth: boolean;
}

const DEFAULT_FORM: FormState = {
  birthday: "2000-08-16",
  birthTime: 2,
  gender: "female",
  birthdayType: "solar",
  isLeapMonth: false,
};

export default function App() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [chart, setChart] = useState<FormState | null>(DEFAULT_FORM);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // 农历日期转 iztro 需要的 "2000-7-17" 格式
  const chartProps = useMemo(() => {
    if (!chart) return null;
    const date = chart.birthday
      ? chart.birthday.split("-").map((n) => Number(n)).join("-")
      : "2000-8-16";
    return {
      birthday: date,
      birthTime: chart.birthTime,
      gender: chart.gender,
      birthdayType: chart.birthdayType,
      isLeapMonth: chart.isLeapMonth,
    };
  }, [chart]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChart({ ...form });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>紫微斗数 · 在线排盘</h1>
        <p>输入生辰，快速生成十二宫星盘。排盘引擎基于开源 iztro / react-iztro。</p>
      </header>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="field">
            <label>历法</label>
            <select
              value={form.birthdayType}
              onChange={(e) =>
                set("birthdayType", e.target.value as "lunar" | "solar")
              }
            >
              <option value="solar">阳历</option>
              <option value="lunar">农历</option>
            </select>
          </div>

          <div className="field">
            <label>出生日期</label>
            <input
              type="date"
              value={form.birthday}
              onChange={(e) => set("birthday", e.target.value)}
            />
          </div>

          <div className="field">
            <label>出生时辰</label>
            <select
              value={form.birthTime}
              onChange={(e) => set("birthTime", Number(e.target.value))}
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>性别</label>
            <select
              value={form.gender}
              onChange={(e) => set("gender", e.target.value as "male" | "female")}
            >
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>

          <button type="submit" className="btn">
            排盘
          </button>
        </div>

        {form.birthdayType === "lunar" && (
          <div className="field" style={{ marginTop: 14, flexDirection: "row", alignItems: "center" }}>
            <label style={{ marginRight: 8 }}>闰月</label>
            <input
              type="checkbox"
              checked={form.isLeapMonth}
              onChange={(e) => set("isLeapMonth", e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
          </div>
        )}

        <p className="hint">
          提示：子时分为“早子时（00:00~01:00）”与“晚子时（23:00~00:00）”，请按实际出生钟点选择，以免命盘相差一格。
        </p>
      </form>

      <div className="chart-wrap">
        {chartProps && (
          <Iztrolabe
            birthday={chartProps.birthday}
            birthTime={chartProps.birthTime}
            gender={chartProps.gender}
            birthdayType={chartProps.birthdayType}
            isLeapMonth={chartProps.isLeapMonth}
          />
        )}
      </div>

      <footer className="footer">
        Powered by{" "}
        <a href="https://github.com/SylarLong/react-iztro" target="_blank" rel="noreferrer">
          iztro / react-iztro
        </a>
        ，仅供命理研究参考。
      </footer>
    </div>
  );
}
