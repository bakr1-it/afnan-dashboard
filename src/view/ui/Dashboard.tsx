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

export default function Dashboard() {
  const [data, setData] = React.useState([
    { category: "Students", count: 0 },
    { category: "Teachers", count: 0 },
    { category: "Languages", count: 0 },
    { category: "Academies", count: 0 },
  ]);
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

        setData([
          { category: "Students", count: studentsCount },
          { category: "Teachers", count: teachersCount },
          { category: "Languages", count: languagesCount },
          { category: "Academies", count: academiesCount },
        ]);
        setTeacherStats(teachersWithStudents);
      } catch (err) {
        console.error("Error loading dashboard counts:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

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
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Welcome to Afnan Dashboard!
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
            A comprehensive educational platform designed to empower students and teachers. Track real-time progress, oversee academies, manage registered languages, and monitor student metrics effortlessly.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link to="/student" className="btn">
              View Students
            </Link>
          </div>
        </div>
      </div>

      <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: 600 }}>
        Dashboard Statistics
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 350 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

          <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              General Overview
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
                    values: ["Students", "Teachers", "Languages", "Academies"],
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
              Students Per Teacher
            </Typography>
            <BarChart
              height={320}
              series={[
                {
                  data: teacherStats.map((t) => t.studentCount),
                  label: "Students",
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
