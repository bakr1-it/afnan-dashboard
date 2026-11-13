import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import type { BarLabelProps, BarProps } from "@mui/x-charts/BarChart";
import { useAnimate, useAnimateBar, useDrawingArea } from "@mui/x-charts/hooks";
import { interpolateObject } from "@mui/x-charts-vendor/d3-interpolate";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { getRowCount, getTeacherStudentCounts } from "../../services/subepaseServicese";
import { useLanguageContext } from "../../context/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguageContext();
  const [counts, setCounts] = React.useState({
    students: 0,
    teachers: 0,
    languages: 0,
    academies: 0,
  });
  const [teacherStats, setTeacherStats] = React.useState<{ name: string; studentCount: number }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadStats() {
      try {
        const [studentsCount, teachersCount, languagesCount, academiesCount, teachersWithStudents] =
          await Promise.all([
            getRowCount("users"),
            getRowCount("teachers"),
            getRowCount("languages"),
            getRowCount("academies"),
            getTeacherStudentCounts(),
          ]);

        setCounts({
          students: studentsCount,
          teachers: teachersCount,
          languages: languagesCount,
          academies: academiesCount,
        });
        setTeacherStats(teachersWithStudents);
      } catch (err) {
        console.error("Error loading dashboard counts:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const data = React.useMemo(
    () => [
      { category: t("studentsCountLabel"), count: counts.students },
      { category: t("teachersCountLabel"), count: counts.teachers },
      { category: t("languagesCountLabel"), count: counts.languages },
      { category: t("academiesCountLabel"), count: counts.academies },
    ],
    [counts, t]
  );

  const maxCount = React.useMemo(() => {
    const max = Math.max(...data.map((d) => d.count), 10);
    return Math.ceil(max * 1.15);
  }, [data]);

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center p-4 shadow-sm border border-primary/20">
          <img src={logo} alt="Afnan Logo" className="w-full h-full object-contain drop-shadow" />
        </div>
        <div className="flex-1 ">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 ">
            {t("welcomeTitle")} 
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
            {t("welcomeDescription")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link to="/student" className="btn">
              {t("viewStudents")}
            </Link>
          </div>
        </div>
      </div>

      <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: 600 }}>
        {t("dashboardStatistics")}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 350 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

          <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {t("generalOverview")}
            </Typography>
            <BarChart
              height={320}
              dataset={data}
              series={[
                {
                  id: "counts",
                  dataKey: "count",
                  valueFormatter: (value: number | null) => `${value ?? 0}`,
                  barLabel: (v) => `${v.value ?? 0}`,
                },
              ]}
              layout="horizontal"
              xAxis={[
                {
                  id: "countAxis",
                  min: 0,
                  max: maxCount,
                  valueFormatter: (value: number | null) => `${value ?? 0}`,
                },
              ]}
              yAxis={[
                {
                  scaleType: "band",
                  dataKey: "category",
                  width: 110,
                  colorMap: {
                    type: "ordinal",
                    values: [
                      t("studentsCountLabel"),
                      t("teachersCountLabel"),
                      t("languagesCountLabel"),
                      t("academiesCountLabel"),
                    ],
                    colors: ["#1976d2", "#78909c", "#2e7d32", "#d32f2f"],
                  },
                },
              ]}
              slots={{
                barLabel: BarLabelAtBase,
                bar: BarShadedBackground,
              }}
            />
          </Paper>

         
          <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {t("studentsPerTeacher")}
            </Typography>
            <BarChart
              height={320}
              series={[
                {
                  data: teacherStats.map((t) => t.studentCount),
                  label: t("studentsCountLabel"),
                  id: "studentsCountId",
                  color: "#f59e0b",
                },
              ]}
              xAxis={[
                {
                  data: teacherStats.map((t) => t.name),
                  scaleType: "band",
                  height: 35,
                },
              ]}
              yAxis={[
                {
                  width: 50,
                  min: 0,
                },
              ]}
            />
          </Paper>
        </div>
      )}
    </Box>
  );
}

export function BarShadedBackground(props: BarProps) {
  const {
    ownerState,
    skipAnimation,
    id,
    dataIndex,
    xOrigin,
    yOrigin,
    seriesId,
    ...other
  } = props;
  const theme = useTheme();

  const animatedProps = useAnimateBar(props);
  const { width } = useDrawingArea();
  return (
    <React.Fragment>
      <rect
        {...other}
        fill={(theme.vars || theme).palette.text.primary}
        opacity={theme.palette.mode === "dark" ? 0.05 : 0.1}
        x={other.x}
        width={width}
      />
      <rect
        {...other}
        filter={ownerState.isHighlighted ? "brightness(120%)" : undefined}
        opacity={ownerState.isFaded ? 0.3 : 1}
        data-highlighted={ownerState.isHighlighted || undefined}
        data-faded={ownerState.isFaded || undefined}
        {...animatedProps}
      />
    </React.Fragment>
  );
}

const Text = styled("text")(({ theme }) => ({
  ...theme?.typography?.body2,
  stroke: "none",
  fill: (theme.vars || theme).palette.common.white,
  transition: "opacity 0.2s ease-in, fill 0.2s ease-in",
  textAnchor: "start",
  dominantBaseline: "central",
  pointerEvents: "none",
  fontWeight: 600,
}));

function BarLabelAtBase(props: BarLabelProps) {
  const {
    seriesId,
    dataIndex,
    color,
    isFaded,
    isHighlighted,
    classes,
    xOrigin,
    yOrigin,
    x,
    y,
    width,
    height,
    layout,
    skipAnimation,
    ...otherProps
  } = props;

  const animatedProps = useAnimate(
    { x: xOrigin + 8, y: y + height / 2 },
    {
      initialProps: { x: xOrigin, y: y + height / 2 },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (element: SVGTextElement, p) => {
        element.setAttribute("x", p.x.toString());
        element.setAttribute("y", p.y.toString());
      },
      skip: skipAnimation,
    },
  );

  return <Text {...otherProps} {...animatedProps} />;
}
