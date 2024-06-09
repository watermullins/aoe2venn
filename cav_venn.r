.libPaths("C:/Users/stuar/R/win-library/4.4")
install.packages("VennDiagram")
library(VennDiagram)

# Load data
data <- read.csv("C:/Users/stuar/workspace/javascript/statsjs/cavtechtext.csv")

# Extract column names excluding the first column (Civilization)
column_names <- names(data)[-1]

# Create a list to store civilization names for each column where the value is "true"
civilization_lists <- lapply(column_names, function(col_name) {
  data$Civilization[data[[col_name]] == "true"]
})

# Create the Venn diagram
venn.plot <- venn.diagram(
  x = civilization_lists,
  category.names = column_names,
  filename = NULL,  # Output to an R object instead of a file
  fill = rainbow(length(column_names)),  # Use different colors for each category
  alpha = 0.5,
  cex = 1.5,
  cat.cex = 1.5,
  cat.pos = 0,
  cat.dist = 0.05,
  cat.col = rep("black", length(column_names)),
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
