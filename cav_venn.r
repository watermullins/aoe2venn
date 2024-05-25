
.libPaths("C:/Users/water/R/win-library/4.4")
install.packages("VennDiagram")
library(VennDiagram)

# Load data
data <- read.csv("C:/Users/water/workspace/javascript/statsjs/cavtechtext.csv")
str(data)

hussar <- data$Civilization[data$Hussar == "true"]
bloodlines <- data$Civilization[data$Bloodlines == "true"]
paladin <- data$Civilization[data$Paladin == "true"]
plate_barding <- data$Civilization[data$Plate.Barding == "true"]
blast_furnace <- data$Civilization[data$Blast.Furnace == "true"]

# Create the Venn diagram
venn.plot <- venn.diagram(
  x = list(
	BlastFurnace = blast_furnace,
	Bloodlines = bloodlines,
	PlateBarding = plate_barding,
	Paladin = paladin,
    Hussar = hussar
  ),
  
  category.names = c("Blast Furnace","Bloodlines","Plate Barding","Paladin","Hussar"),
  filename = NULL,  # Output to an R object instead of a file
  fill = c("purple", "red", "green", "blue", "yellow"),
  alpha = 0.5,
  cex = 1.5,
  cat.cex = 1.5,
  cat.pos = 0,
  cat.dist = 0.05,
  cat.col = c("black", "black", "black", "black", "black"),
  lwd = 2,
  resolution = 800,
  lty = "blank"
)

# Print to console
grid.newpage()
grid.draw(venn.plot)

# Save Venn to file
png(filename = "cav_venn.png", width = 800, height = 800)
grid.draw(venn.plot)
dev.off()
